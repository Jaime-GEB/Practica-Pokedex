import { useEffect } from 'react';
import DetailsNav from './PokemonDetails/DetailsNav';
import useDetail from './PokemonDetails/hooks/useDetail';
import PokemonSpritePanel from './components/PokemonSpritePanel';
import PokemonDataPanel from './components/PokemonDataPanel';

const PokemonDetail = () => {
    const { 
        pokemon, 
        pokemonId, 
        species, 
        abilityDesc, 
        evolutionLevel, 
        loading, 
        fetchData 
    } = useDetail();

    useEffect(() => {
        fetchData();
    }, [pokemonId]);

    if (loading || !pokemon) {
        return (
            <div className="h-full w-full bg-cyan-400 text-white flex items-center justify-center font-bold animate-pulse">
                LOADING DATA...
            </div>
        );
    }

    const flavorText = species?.flavor_text_entries
        .find(e => e.language.name === 'en')?.flavor_text
        .replaceAll(/\f/g, ' ') || "No data.";

    return (
        <div className="h-full w-full bg-cyan-400 relative overflow-hidden flex flex-col font-sans text-white select-none">
            {/* Background Glow */}
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,transparent_0%,rgba(6,182,212,0.5)_100%)] pointer-events-none"></div>

            {/* Nav Header */}
            <DetailsNav pokemonId={pokemonId} pokemonName={pokemon.name} />

            {/* Main Content Grid */}
            <div className="flex flex-1 p-2 gap-2 overflow-hidden items-stretch relative z-10">
                {/* LEFT COL: Sprite & Basic Info */}
                <PokemonSpritePanel 
                    pokemon={pokemon} 
                    evolutionLevel={evolutionLevel} 
                />

                {/* RIGHT COL: Stats & Details */}
                <PokemonDataPanel 
                    pokemon={pokemon} 
                    abilityDesc={abilityDesc} 
                    flavorText={flavorText} 
                />
            </div>
        </div>
    );
};

export default PokemonDetail;
