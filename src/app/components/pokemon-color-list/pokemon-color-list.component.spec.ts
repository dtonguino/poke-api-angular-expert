import { HttpErrorResponse } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { PokemonService } from '../../services/pokemon.service';
import { PokemonColorListComponent } from './pokemon-color-list.component';

describe('PokemonColorListComponent', () => {
	let component: PokemonColorListComponent;
	let httpTestingController: HttpTestingController;
	let pokemonService: PokemonService;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [HttpClientTestingModule, PokemonColorListComponent],
			providers: [PokemonService]
		}).compileComponents();

		component = TestBed.createComponent(PokemonColorListComponent).componentInstance;
		pokemonService = TestBed.inject(PokemonService);
		httpTestingController = TestBed.inject(HttpTestingController);
	});

	afterEach(() => {
		httpTestingController.verify();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should fetch pokemon colors on initialization', (done) => {
		const mockResponse = {
			results: [
				{ name: 'red', url: `${pokemonService.apiUrl}/pokemon-color/1/` },
				{ name: 'blue', url: `${pokemonService.apiUrl}/pokemon-color/2/` },
				{ name: 'green', url: `${pokemonService.apiUrl}/pokemon-color/3/` }
			]
		};

		component.colors$.subscribe((colors) => {
			expect(colors).toEqual(mockResponse);
			done();
		});

		const req = httpTestingController.expectOne(`${pokemonService.apiUrl}/pokemon-color`);
		expect(req.request.method).toBe('GET');
		req.flush(mockResponse);
	});

	it('should handle error on failed request', (done) => {
		const mockErrorMessage = 'Failed to load Pokemon colors';

		component.colors$.subscribe({
			next: () => {},
			error: (err) => {
				expect(err).toBeInstanceOf(HttpErrorResponse);
				expect(err.status).toBe(500);
				expect(err.statusText).toBe('Internal Server Error');
				expect(err.error).toBe(mockErrorMessage);
				done();
			}
		});

		const req = httpTestingController.expectOne(`${pokemonService.apiUrl}/pokemon-color`);
		req.flush(mockErrorMessage, { status: 500, statusText: 'Internal Server Error' });
	});
});
