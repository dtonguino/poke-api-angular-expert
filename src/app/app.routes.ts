import { Route } from '@angular/router';

export const routes: Route[] = [
	{
		path: '',
		pathMatch: 'full',
		redirectTo: 'pokemon'
	},
	{
		path: 'pokemon',
		title: 'Pokemon List',
		loadComponent: () => import('./components/pokemon-list/pokemon-list.component').then((c) => c.PokemonListComponent),
		data: {
			preload: true
		}
	},
	{
		path: 'pokemon/:id',
		title: 'Pokemon Detail',
		loadComponent: () =>
			import('./components/pokemon-detail/pokemon-detail.component').then((c) => c.PokemonDetailComponent),
		data: {
			preload: true
		}
	},
	{
		path: 'types',
		title: 'Pokemon Types List',
		loadComponent: () =>
			import('./components/pokemon-types-list/pokemon-types-list.component').then((c) => c.PokemonTypesListComponent)
	},
	{
		path: 'abilities',
		title: 'Pokemon Abilities List',
		loadComponent: () =>
			import('./components/pokemon-abilities-list/pokemon-abilities-list.component').then(
				(c) => c.PokemonAbilitiesListComponent
			)
	},
	{
		path: 'colors',
		title: 'Pokemon Generations List',
		loadComponent: () =>
			import('./components/pokemon-color-list/pokemon-color-list.component').then((c) => c.PokemonColorListComponent)
	}
];
