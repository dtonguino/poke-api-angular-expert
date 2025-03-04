import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PokemonService } from '../../services/pokemon.service';
import { PokemonTypesListComponent } from './pokemon-types-list.component';

describe('PokemonTypesListComponent', () => {
	let component: PokemonTypesListComponent;
	let fixture: ComponentFixture<PokemonTypesListComponent>;
	let httpTestingController: HttpTestingController;
	let pokemonService: PokemonService;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [HttpClientTestingModule, PokemonTypesListComponent],
			providers: [PokemonService]
		}).compileComponents();

		component = TestBed.createComponent(PokemonTypesListComponent).componentInstance;
		pokemonService = TestBed.inject(PokemonService);
		httpTestingController = TestBed.inject(HttpTestingController);
	});

	afterEach(() => {
		httpTestingController.verify();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should fetch pokemon types on initialization', (done) => {
		const mockResponse = {
			results: [
				{ name: 'fire', url: `${pokemonService.apiUrl}/type/1/` },
				{ name: 'water', url: `${pokemonService.apiUrl}/type/2/` },
				{ name: 'grass', url: `${pokemonService.apiUrl}/type/3/` }
			]
		};

		component.types$.subscribe((types) => {
			expect(types).toEqual(mockResponse);
			done();
		});

		const req = httpTestingController.expectOne(`${pokemonService.apiUrl}/type`);
		expect(req.request.method).toBe('GET');
		req.flush(mockResponse);
	});

	it('should map the correct color for each type', () => {
		const colors = component.getTypeColor('fire');
		expect(colors).toBe('bg-orange-500');

		const waterColor = component.getTypeColor('water');
		expect(waterColor).toBe('bg-blue-500');

		const unknownColor = component.getTypeColor('unknown');
		expect(unknownColor).toBe('bg-gray-500');
	});
});
