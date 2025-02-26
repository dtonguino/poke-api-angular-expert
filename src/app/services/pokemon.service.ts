import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Pokemon, PokemonDetails } from '../models/pokemon.model';

@Injectable({
	providedIn: 'root'
})
export class PokemonService {
	private apiUrl = 'https://pokeapi.co/api/v2/pokemon';
	private imageUrl = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork';

	constructor(private http: HttpClient) {}

	getPokemons(offset: number = 0, limit: number = 20): Observable<Pokemon[]> {
		return this.http.get<any>(`${this.apiUrl}?offset=${offset}&limit=${limit}`).pipe(
			map((response) =>
				response.results.map((pokemon: any) => {
					const id = pokemon.url.split('/')[6];
					return {
						...pokemon,
						id: +id,
						image: `${this.imageUrl}/${id}.png`
					};
				})
			)
		);
	}

	getPokemonDetail(id: number): Observable<any> {
		return this.http.get<PokemonDetails>(`https://pokeapi.co/api/v2/pokemon/${id}`);
	}
}
