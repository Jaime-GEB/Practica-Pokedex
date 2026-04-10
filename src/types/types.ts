export interface PokemonData {
    id: number;
    name: string;
    height: number;
    weight: number;
    stats: { base_stat: number; stat: { name: string } }[];
    types: { type: { name: string } }[];
    abilities: { ability: { name: string; url: string }; is_hidden: boolean }[];
    sprites: { other: { 'official-artwork': { front_default: string } } };
}

export interface SpeciesData {
    flavor_text_entries: { flavor_text: string; language: { name: string } }[];
    evolution_chain: { url: string };
}

export interface AbilityData {
    effect_entries: { effect: string; short_effect: string; language: { name: string } }[];
}

export interface EvolutionChainNode {
    species: { name: string };
    evolves_to: EvolutionChainNode[];
    evolution_details: { min_level: number; trigger: { name: string } }[];
}
