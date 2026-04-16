import PokemonGridItem from './PokemonGridItem';

interface PokemonListResult {
    name: string;
    url: string;
}

interface PokemonGridProps {
    pokemons: PokemonListResult[];
    getPokemonId: (url: string) => string;
}

const PokemonGrid = ({ pokemons, getPokemonId }: PokemonGridProps) => {
    return (
        <div className="flex-1 overflow-y-auto px-6 pb-4 relative z-10 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white/50 hover:scrollbar-thumb-white/80">
            <span className="text-white text-xs font-bold">Especies: {pokemons.length}</span>
            <div className="grid grid-cols-6 gap-y-2 gap-x-2 mt-1">
                {pokemons.map((pokemon) => (
                    <PokemonGridItem 
                        key={pokemon.name} 
                        id={getPokemonId(pokemon.url)} 
                        name={pokemon.name} 
                    />
                ))}
            </div>
        </div>
    );
};

export default PokemonGrid;
