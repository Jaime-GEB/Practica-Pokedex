import { useParams } from 'react-router-dom';
import { pokeApi } from '../../../../../services/pokeApi';
import { useState } from 'react';
import {
    type PokemonData,
    type SpeciesData,
    type AbilityData,
    type EvolutionChainNode
} from '../../../../../types/typeFile';

const findNextEvolutionLevel = (node: EvolutionChainNode, currentName: string): number | null => {

    if (node.species.name === currentName) {
        if (node.evolves_to.length > 0) {
            const levelUp = node.evolves_to.find(evo => evo.evolution_details[0]?.min_level);
            return levelUp?.evolution_details[0]?.min_level || null;
        }
        return null;
    }
    for (const child of node.evolves_to) {
        const found = findNextEvolutionLevel(child, currentName);
        if (found) return found;
    }
    return null;
};

const useDetail = () => {

    const { id } = useParams();
    const pokemonId = Number(id);

    const [pokemon, setPokemon] = useState<PokemonData | null>(null);
    const [species, setSpecies] = useState<SpeciesData | null>(null);
    const [abilityDesc, setAbilityDesc] = useState<string>('');
    const [evolutionLevel, setEvolutionLevel] = useState<string>('-');
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        if (!pokemonId) return;
        setLoading(true);
        try {
            // 1. Get Pokemon Data
            const pokeData = await pokeApi.getPokemon<PokemonData>(pokemonId);
            setPokemon(pokeData);
            // 2. Get Species Data
            const speciesData = await pokeApi.getPokemonSpecies<SpeciesData>(pokemonId);
            setSpecies(speciesData);
            // 3. Get Ability Data (Primary Ability)
            const mainAbilityUrl = pokeData.abilities[0]?.ability.url;
            if (mainAbilityUrl) {
                const abilityData = await pokeApi.getByUrl<AbilityData>(mainAbilityUrl);
                const entry = abilityData.effect_entries.find((e) => e.language.name === 'en');
                setAbilityDesc(entry?.short_effect || entry?.effect || 'No description available.');
            }
            // 4. Get Evolution Chain to find next level
            if (speciesData.evolution_chain?.url) {
                const evoData = await pokeApi.getByUrl<{ chain: EvolutionChainNode }>(speciesData.evolution_chain.url);
                const nextLevel = findNextEvolutionLevel(evoData.chain, pokeData.name);
                setEvolutionLevel(nextLevel ? `Lv. ${nextLevel}` : 'MAX');
            }
        } catch (error) {
            console.error("Error fetching details", error);
        } finally {
            setLoading(false);
        }
    };

    return {
        pokemon,
        pokemonId,
        species,
        abilityDesc,
        evolutionLevel,
        loading,
        fetchData
    };
};
export default useDetail;