import { useEffect, useState } from 'react';
import { pokeApi } from '../../../../services/pokeApi';

interface PokemonListResult {
    name: string;
    url: string;
}

const usePokedexGrid = () => {
    const [pokemons, setPokemons] = useState<PokemonListResult[]>([]);
    const [selectedType, setSelectedType] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                if (selectedType) {
                    const response = await pokeApi.getTypeDetails<{ pokemon: { pokemon: PokemonListResult }[] }>(selectedType);
                    setPokemons(response.pokemon.map(p => p.pokemon));
                } else {
                    const response = await pokeApi.getPokemonList<{ results: PokemonListResult[] }>(5000);
                    setPokemons(response.results);
                }
            } catch (error) {
                console.error('Error fetching pokemons:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [selectedType]);

    const getPokemonId = (url: string) => {
        const parts = url.split('/');
        return parts.at(-2) || '';
    };

    return {
        pokemons,
        selectedType,
        setSelectedType,
        loading,
        getPokemonId
    };
};

export default usePokedexGrid;
