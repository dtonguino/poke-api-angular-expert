import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { PokemonService } from '../../services/pokemon.service';

@Component({
	selector: 'app-pokemon-color-list',
	imports: [CommonModule],
	templateUrl: './pokemon-color-list.component.html',
	styleUrl: './pokemon-color-list.component.css',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class PokemonColorListComponent {
	private readonly pokemonService = inject(PokemonService);
	colors$ = this.pokemonService.getPokemonColors();
}
