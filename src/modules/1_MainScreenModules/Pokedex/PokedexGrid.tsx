import { useEffect, useState } from 'react';
import { pokeApi } from '../../../services/pokeApi';
import { useNavigate } from 'react-router-dom';

interface PokemonListResult {
    name: string;
    url: string;
}

interface TypeListResult {
    name: string;
    url: string;
}

const PokedexGrid = () => {
    const [pokemons, setPokemons] = useState<PokemonListResult[]>([]);
    const [types, setTypes] = useState<TypeListResult[]>([]);
    const [selectedType, setSelectedType] = useState<string>('');
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchTypes = async () => {
            const response = await pokeApi.getTypesList<{ results: TypeListResult[] }>();
            setTypes(response.results);
        };
        fetchTypes();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            if (selectedType) {
                const response = await pokeApi.getTypeDetails<{ pokemon: { pokemon: PokemonListResult }[] }>(selectedType);
                setPokemons(response.pokemon.map(p => p.pokemon));
            } else {
                const response = await pokeApi.getPokemonList<{ results: PokemonListResult[] }>(5000);
                setPokemons(response.results);
            }
        };
        fetchData();
    }, [selectedType]);

    const getPokemonId = (url: string) => {
        const parts = url.split('/');
        return parts[parts.length - 2];
    };

    const currentTypeLabel = selectedType ? selectedType.toUpperCase() : 'ALL TYPES';

    return (
        <div className="h-full w-full bg-cyan-400 relative overflow-hidden flex flex-col font-sans">
            {/* Glow Effects */}
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,transparent_0%,rgba(6,182,212,0.5)_100%)] pointer-events-none"></div>

            {/* Header Info & Filter */}
            <div className="flex justify-between items-center px-6 py-2 bg-cyan-500/80 text-white text-xs font-bold border-b border-cyan-300 relative z-20 shadow-sm backdrop-blur-sm">
                <div onClick={() => navigate('/home')} className="cursor-pointer font-bold text-white hover:text-cyan-100 text-[10px] bg-cyan-700 px-2 py-0.5 rounded border border-cyan-400">
                    BACK
                </div>
                <span>Especies: {pokemons.length}</span>

                {/* Custom Dropdown */}
                <div className="relative">
                    <button
                        onClick={() => setIsFilterOpen(!isFilterOpen)}
                        className="bg-cyan-700 text-white border border-cyan-400 rounded px-3 py-1 text-xs outline-none focus:ring-1 focus:ring-white/50 w-32 flex justify-between items-center"
                    >
                        <span>{currentTypeLabel}</span>
                        <span className="ml-1 text-[10px]">▼</span>
                    </button>

                    {isFilterOpen && (
                        <div className="absolute top-full right-0 mt-1 w-32 max-h-40 overflow-y-auto bg-cyan-800 border border-cyan-400 rounded shadow-xl scrollbar-thin scrollbar-track-cyan-900 scrollbar-thumb-cyan-500">
                            <div
                                onClick={() => { setSelectedType(''); setIsFilterOpen(false); }}
                                className={`px-3 py-2 cursor-pointer hover:bg-cyan-600 text-white text-xs ${selectedType === '' ? 'bg-cyan-600 font-bold' : ''}`}
                            >
                                ALL TYPES
                            </div>
                            {types.map(t => (
                                <div
                                    key={t.name}
                                    onClick={() => { setSelectedType(t.name); setIsFilterOpen(false); }}
                                    className={`px-3 py-2 cursor-pointer hover:bg-cyan-600 text-white text-xs uppercase ${selectedType === t.name ? 'bg-cyan-600 font-bold' : ''}`}
                                >
                                    {t.name}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Scrollable Grid Area */}
            <div className="flex-1 overflow-y-auto px-6 pb-4 relative z-10 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white/50 hover:scrollbar-thumb-white/80">
                <div className="grid grid-cols-6 gap-y-2 gap-x-2 mt-5">
                    {pokemons.map((pokemon) => {
                        const id = getPokemonId(pokemon.url);
                        return (
                            <div
                                key={pokemon.name}
                                onClick={() => navigate(`/pokedex/${id}`)}
                                draggable={true}
                                onDragStart={(e) => {
                                    e.dataTransfer.setData('pokemon', JSON.stringify({ id, name: pokemon.name }));
                                    e.dataTransfer.effectAllowed = 'copy';
                                }}
                                className="flex flex-col items-center my-1 border border-white/50 justify-center group cursor-pointer hover:scale-110 transition-transform active:cursor-grabbing"
                            >
                                <div className="w-10 h-10 flex items-center justify-center relative">
                                    <img
                                        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`}
                                        alt={pokemon.name}
                                        className="w-full h-full object-contain image-pixelated drop-shadow-md"
                                        loading="lazy"
                                    />
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default PokedexGrid;
