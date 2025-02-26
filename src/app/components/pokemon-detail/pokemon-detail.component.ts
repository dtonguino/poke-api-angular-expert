import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { PokemonDetails } from '../../models/pokemon.model';
import { PokemonService } from '../../services/pokemon.service';

@Component({
	selector: 'app-pokemon-detail',
	imports: [CommonModule, RouterModule],
	templateUrl: './pokemon-detail.component.html',
	styleUrl: './pokemon-detail.component.css',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class PokemonDetailComponent implements OnInit {
	private readonly pokemonService = inject(PokemonService);
	private readonly route = inject(ActivatedRoute);
	pokemon!: PokemonDetails;
	isLoading = true;
	error = false;

	ngOnInit(): void {
		this.route.params.subscribe((params) => {
			const id = params['id'];
			this.loadPokemon(id);
		});
	}

	loadPokemon(id: number) {
		this.isLoading = true;
		this.pokemonService.getPokemonDetail(id).subscribe({
			next: (data) => {
				this.pokemon = data;
				this.isLoading = false;
			},
			error: () => {
				this.error = true;
				this.isLoading = false;
			}
		});
	}

	getTypeColor(type: string): string {
		const colors: { [key: string]: string } = {
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
}
