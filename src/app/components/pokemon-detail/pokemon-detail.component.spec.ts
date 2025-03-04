import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DestroyRef } from '@angular/core';
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { of, throwError } from 'rxjs';
import { PokemonService } from '../../services/pokemon.service';
import { PokemonDetailComponent } from './pokemon-detail.component';

describe('PokemonDetailComponent', () => {
	let component: PokemonDetailComponent;
	let fixture: ComponentFixture<PokemonDetailComponent>;
	let mockPokemonService: jasmine.SpyObj<PokemonService>;
	const mockPokemon = {
		id: 1,
		name: 'bulbasaur',
		types: [{ type: { name: 'grass' } }, { type: { name: 'poison' } }],
		stats: [],
		abilities: [],
		height: 7,
		weight: 69,
		sprites: {
			front_default: 'url',
			back_default: 'url',
			other: { 'official-artwork': { front_default: 'url' }, home: { front_default: '' } }
		}
	};

	beforeEach(async () => {
		mockPokemonService = jasmine.createSpyObj('PokemonService', ['getPokemonDetail']);

		await TestBed.configureTestingModule({
			imports: [HttpClientTestingModule],
			providers: [
				{ provide: PokemonService, useValue: mockPokemonService },
				{
					provide: ActivatedRoute,
					useValue: { snapshot: { params: convertToParamMap({ id: '1' }) } }
				},
				DestroyRef
			]
		}).compileComponents();

		fixture = TestBed.createComponent(PokemonDetailComponent);
		component = fixture.componentInstance;
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should initialize with loading state', () => {
		expect(component.isLoading()).toBeTrue();
		expect(component.pokemon()).toBeNull();
		expect(component.error()).toBeFalse();
	});

	it('should load pokemon details successfully', fakeAsync(() => {
		mockPokemonService.getPokemonDetail.and.returnValue(of(mockPokemon));

		fixture.detectChanges();
		tick(500);

		expect(component.pokemon()?.name).toBe('bulbasaur');
		expect(component.isLoading()).toBeFalse();
		expect(component.error()).toBeFalse();
	}));

	it('should handle loading error', fakeAsync(() => {
		mockPokemonService.getPokemonDetail.and.returnValue(throwError(() => new Error('Test error')));

		fixture.detectChanges();
		tick(500);

		expect(component.error()).toBeTrue();
		expect(component.isLoading()).toBeFalse();
		expect(component.pokemon()).toBeNull();
	}));

	it('should reload data', fakeAsync(() => {
		mockPokemonService.getPokemonDetail.and.returnValue(of(mockPokemon));

		component.reload();
		tick(500);

		expect(mockPokemonService.getPokemonDetail).toHaveBeenCalledTimes(1);
		expect(component.pokemon()).toEqual(mockPokemon);
	}));

	it('should return correct type colors', () => {
		expect(component.getTypeColor('fire')).toBe('bg-orange-500');
		expect(component.getTypeColor('unknown')).toBe('bg-gray-500');
	});

	it('should format stat names correctly', () => {
		expect(component.statName('special-attack')).toBe('Sp. attack');
		expect(component.statName('hp')).toBe('hp');
	});

	it('should compute isReady state correctly', fakeAsync(() => {
		mockPokemonService.getPokemonDetail.and.returnValue(of(mockPokemon));

		fixture.detectChanges();
		tick(500);

		expect(component.isReady()).toBeTrue();
	}));
});
