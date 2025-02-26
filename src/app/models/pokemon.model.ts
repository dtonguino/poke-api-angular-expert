export interface Pokemon {
	name: string;
	url: string;
	id: number; // ID obtenido de la URL
	image: string; // URL de la imagen HD
}

export interface PokemonDetails {
	id: number;
	name: string;
	types: Array<{ type: { name: string } }>;
	stats: Array<{ base_stat: number; stat: { name: string } }>;
	abilities: Array<{ ability: { name: string } }>;
	height: number;
	weight: number;
	sprites: {
		front_default: string;
		back_default: string;
		other: {
			'official-artwork': { front_default: string };
			home: { front_default: string };
		};
	};
}
