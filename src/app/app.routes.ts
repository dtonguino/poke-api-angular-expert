import { Route } from '@angular/router';
import { PokemonDetailComponent } from './components/pokemon-detail/pokemon-detail.component';
import { PokemonListComponent } from './components/pokemon-list/pokemon-list.component';

export const routes: Route[] = [
	{
		path: '',
		pathMatch: 'full',
		redirectTo: 'pokemon'
	},
	{
		path: 'pokemon',
		title: 'Pokemon List',
		loadComponent: () => import('./components/pokemon-list/pokemon-list.component').then(() => PokemonListComponent)
	},
	{
		path: 'pokemon/:id',
		title: 'Pokemon Detail',
		loadComponent: () =>
			import('./components/pokemon-detail/pokemon-detail.component').then(() => PokemonDetailComponent),
		data: {
			preload: true
		}
	}
];
