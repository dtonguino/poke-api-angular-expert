import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BehaviorSubject, combineLatest, Observable, switchMap } from 'rxjs';
import { Pokemon } from '../../models/pokemon.model';
import { PokemonService } from '../../services/pokemon.service';

@Component({
	selector: 'app-pokemon-list',
	imports: [CommonModule, RouterLink],
	templateUrl: './pokemon-list.component.html',
	styleUrl: './pokemon-list.component.css',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class PokemonListComponent {
	private readonly pokemonService = inject(PokemonService);
	private offset$ = new BehaviorSubject<number>(0);
	private limit = 20;

	pokemons$!: Observable<Pokemon[]>;

	constructor() {}

	pagination$ = combineLatest({
		pokemons: this.offset$.pipe(switchMap((offset) => this.pokemonService.getPokemons(offset, this.limit))),
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
