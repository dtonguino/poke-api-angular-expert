import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { PokemonService } from '../../services/pokemon.service';

@Component({
	selector: 'app-pokemon-types-list',
	imports: [CommonModule],
	templateUrl: './pokemon-types-list.component.html',
	styleUrl: './pokemon-types-list.component.css',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class PokemonTypesListComponent {
	private readonly pokemonService = inject(PokemonService);
	types$ = this.pokemonService.getPokemonTypes();

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
}
