import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, DestroyRef, effect, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { catchError, finalize, of } from 'rxjs';
import { PokemonDetails } from '../../models/pokemon.model';
import { PokemonService } from '../../services/pokemon.service';

@Component({
	selector: 'app-pokemon-detail',
	imports: [CommonModule, RouterModule],
	templateUrl: './pokemon-detail.component.html',
	styleUrl: './pokemon-detail.component.css',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class PokemonDetailComponent {
	private readonly pokemonService = inject(PokemonService);
	private readonly route = inject(ActivatedRoute);
	private readonly destroyRef = inject(DestroyRef);

	// Estados reactivos
	pokemon = signal<PokemonDetails | null>(null);
	isLoading = signal(true);
	error = signal(false);

	constructor() {
		effect((onCleanup) => {
			const id = this.route.snapshot.params['id'];
			this.loadPokemon(Number(id));
		});
	}

	private loadPokemon(id: number) {
		this.isLoading.set(true);
		this.error.set(false);

		this.pokemonService
			.getPokemonDetail(id)
			.pipe(
				takeUntilDestroyed(this.destroyRef),
				finalize(() => this.isLoading.set(false)),
				catchError(() => {
					this.error.set(true);
					return of(null);
				})
			)
			.subscribe((data) => {
				if (data) this.pokemon.set(data);
			});
	}

	// Estado computado para @defer
	isReady = computed(() => !!this.pokemon() && !this.isLoading() && !this.error());

	getTypeColor(type: string): string {
		const colors: Record<string, string> = {
			fire: 'bg-orange-500',
			water: 'bg-blue-500',
			grass: 'bg-green-500',
			electric: 'bg-yellow-400',
			psychic: 'bg-purple-500',
			normal: 'bg-gray-400',
			fighting: 'bg-red-700',
			flying: 'bg-blue-300',
			poison: 'bg-purple-600',
			ground: 'bg-yellow-700',
			rock: 'bg-yellow-800',
			bug: 'bg-lime-500',
			ghost: 'bg-indigo-700',
			steel: 'bg-gray-300',
			dragon: 'bg-indigo-500',
			dark: 'bg-gray-800',
			fairy: 'bg-pink-300',
			ice: 'bg-cyan-300'
		};
		return colors[type] || 'bg-gray-500';
	}

	statName(stat: string): string {
		return stat.replace('special-', 'Sp. ').replace('-', ' ');
	}

	reload() {
		const id = Number(this.route.snapshot.params['id']);
		this.loadPokemon(id);
	}
}
