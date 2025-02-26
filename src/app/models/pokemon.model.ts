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

export interface PokemonType {
	id: number;
	name: string;
	damage_relations: {
		double_damage_from: { name: string; url: string }[];
		double_damage_to: { name: string; url: string }[];
		half_damage_from: { name: string; url: string }[];
		half_damage_to: { name: string; url: string }[];
		no_damage_from: { name: string; url: string }[];
		no_damage_to: { name: string; url: string }[];
	};
	game_indices: { game_index: number; generation: { name: string; url: string } }[];
	generation: { name: string; url: string };
	move_damage_class: { name: string; url: string };
	moves: { name: string; url: string }[];
	names: { name: string; language: { name: string; url: string } }[];
	pokemon: { slot: number; pokemon: { name: string; url: string } }[];
}

export interface PokemonAbility {
	id: number;
	name: string;
	is_main_series: boolean;
	generation: { name: string; url: string };
	names: { name: string; language: { name: string; url: string } }[];
	effect_entries: { effect: string; short_effect: string; language: { name: string; url: string } }[];
	effect_changes: {
		version_group: { name: string; url: string };
		effect_entries: { effect: string; language: { name: string; url: string } }[];
	}[];
	flavor_text_entries: {
		flavor_text: string;
		language: { name: string; url: string };
		version_group: { name: string; url: string };
	}[];
	pokemon: { is_hidden: boolean; slot: number; pokemon: { name: string; url: string } }[];
}

export interface PokemonColor {
	id: number;
	name: string;
	names: { name: string; language: { name: string; url: string } }[];
	pokemon_species: { name: string; url: string }[];
}
