import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { BehaviorSubject, combineLatest, switchMap } from 'rxjs';
import { PokemonService } from '../../services/pokemon.service';

@Component({
	selector: 'app-pokemon-abilities-list',
	imports: [CommonModule],
	templateUrl: './pokemon-abilities-list.component.html',
	styleUrl: './pokemon-abilities-list.component.css',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class PokemonAbilitiesListComponent {
	private readonly pokemonService = inject(PokemonService);
	private offset$ = new BehaviorSubject<number>(0);
	private limit = 20;

	constructor() {}

	pagination$ = combineLatest({
		abilities: this.offset$.pipe(switchMap((offset) => this.pokemonService.getPokemonAbilities(offset, this.limit))),
		offset: this.offset$
	});

	nextPage() {
		this.offset$.next(this.offset$.value + this.limit);
	}

	prevPage() {
		this.offset$.next(Math.max(0, this.offset$.value - this.limit));
	}

	get currentPage(): number {
		return this.offset$.value / this.limit + 1;
	}
}
