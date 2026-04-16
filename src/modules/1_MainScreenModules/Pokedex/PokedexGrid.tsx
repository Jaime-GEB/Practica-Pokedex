import usePokedexGrid from './hooks/usePokedexGrid';
import PokedexHeader from './components/PokedexHeader';
import PokemonGrid from './components/PokemonGrid';

const PokedexGrid = () => {
    const { 
        pokemons, 
        selectedType, 
        setSelectedType, 
        getPokemonId 
    } = usePokedexGrid();

    return (
        <div className="h-full w-full bg-cyan-400 relative overflow-hidden flex flex-col font-sans">
            {/* Glow Effects */}
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,transparent_0%,rgba(6,182,212,0.5)_100%)] pointer-events-none"></div>

            {/* Header Info & Filter */}
            <PokedexHeader 
                selectedType={selectedType} 
                onTypeSelect={setSelectedType} 
            />

            {/* Scrollable Grid Area */}
            <PokemonGrid 
                pokemons={pokemons} 
                getPokemonId={getPokemonId} 
            />
        </div>
    );
};

export default PokedexGrid;
