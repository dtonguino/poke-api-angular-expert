import { Route } from '@angular/router';
import { PokemonAbilitiesListComponent } from './components/pokemon-abilities-list/pokemon-abilities-list.component';
import { PokemonColorListComponent } from './components/pokemon-color-list/pokemon-color-list.component';
import { PokemonDetailComponent } from './components/pokemon-detail/pokemon-detail.component';
import { PokemonListComponent } from './components/pokemon-list/pokemon-list.component';
import { PokemonTypesListComponent } from './components/pokemon-types-list/pokemon-types-list.component';

export const routes: Route[] = [
	{
		path: '',
		pathMatch: 'full',
		redirectTo: 'pokemon'
	},
	{
		path: 'pokemon',
		title: 'Pokemon List',
		loadComponent: () => import('./components/pokemon-list/pokemon-list.component').then(() => PokemonListComponent),
		data: {
			preload: true
		}
	},
	{
		path: 'pokemon/:id',
		title: 'Pokemon Detail',
		loadComponent: () =>
			import('./components/pokemon-detail/pokemon-detail.component').then(() => PokemonDetailComponent),
		data: {
			preload: true
		}
	},
	{
		path: 'types',
		title: 'Pokemon Types List',
		loadComponent: () =>
			import('./components/pokemon-types-list/pokemon-types-list.component').then(() => PokemonTypesListComponent)
	},
	{
		path: 'abilities',
		title: 'Pokemon Abilities List',
		loadComponent: () =>
			import('./components/pokemon-abilities-list/pokemon-abilities-list.component').then(
				() => PokemonAbilitiesListComponent
			)
	},
	{
		path: 'colors',
		title: 'Pokemon Generations List',
		loadComponent: () =>
			import('./components/pokemon-color-list/pokemon-color-list.component').then(() => PokemonColorListComponent)
	}
];
