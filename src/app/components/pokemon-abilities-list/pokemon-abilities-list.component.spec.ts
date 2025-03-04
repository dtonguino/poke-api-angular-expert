import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { PokemonService } from '../../services/pokemon.service';
import { PokemonAbilitiesListComponent } from './pokemon-abilities-list.component';

describe('PokemonAbilitiesListComponent', () => {
	let component: PokemonAbilitiesListComponent;
	let httpTestingController: HttpTestingController;
	let pokemonService: PokemonService;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [HttpClientTestingModule, PokemonAbilitiesListComponent],
			providers: [PokemonService]
		}).compileComponents();

		component = TestBed.createComponent(PokemonAbilitiesListComponent).componentInstance;
		pokemonService = TestBed.inject(PokemonService);
		httpTestingController = TestBed.inject(HttpTestingController);
	});

	afterEach(() => {
		httpTestingController.verify();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should fetch abilities on initialization', (done) => {
		const mockResponse = {
			results: [
				{ name: 'overgrow', url: `${pokemonService.apiUrl}/ability/1/` },
				{ name: 'chlorophyll', url: `${pokemonService.apiUrl}/ability/2/` }
			]
		};

		component.pagination$.subscribe(({ abilities }) => {
			expect(abilities).toEqual(mockResponse);
			done();
		});

		const req = httpTestingController.expectOne(`${pokemonService.apiUrl}/ability?offset=0&limit=20`);
		expect(req.request.method).toBe('GET');
		req.flush(mockResponse);
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
