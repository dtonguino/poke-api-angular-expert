import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { PokemonService } from '../../services/pokemon.service';
import { PokemonListComponent } from './pokemon-list.component';

describe('PokemonListComponent', () => {
	let component: PokemonListComponent;
	let pokemonService: jasmine.SpyObj<PokemonService>;
	let httpTestingController: HttpTestingController;

	beforeEach(async () => {
		const pokemonServiceSpy = jasmine.createSpyObj('PokemonService', ['getPokemons']);

		await TestBed.configureTestingModule({
			imports: [HttpClientTestingModule],
			providers: [{ provide: PokemonService, useValue: pokemonServiceSpy }]
		}).compileComponents();

		component = TestBed.createComponent(PokemonListComponent).componentInstance;
		pokemonService = TestBed.inject(PokemonService) as jasmine.SpyObj<PokemonService>;
		httpTestingController = TestBed.inject(HttpTestingController);
	});

	afterEach(() => {
		httpTestingController.verify();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should fetch pokemons on initialization', (done) => {
		const mockPokemons = [
			{
				name: 'bulbasaur',
				url: `${pokemonService.apiUrl}/pokemon/1/`,
				id: 1,
				image: 'https://pokeapi.co/media/sprites/1.png'
			},
			{
				name: 'ivysaur',
				url: `${pokemonService.apiUrl}/pokemon/2/`,
				id: 2,
				image: 'https://pokeapi.co/media/sprites/2.png'
			}
		];

		pokemonService.getPokemons.and.returnValue(of(mockPokemons));

		component.pagination$.subscribe(({ pokemons }) => {
			expect(pokemons).toEqual(mockPokemons);
			done();
		});
	});

	it('should navigate to next page', () => {
		component.nextPage();
		expect(component.currentPage).toBe(2);
	});

	it('should navigate to previous page but not below 1', () => {
		component.prevPage();
		expect(component.currentPage).toBe(1);
	});
});
