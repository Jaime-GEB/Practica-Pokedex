import { useEffect, useState } from 'react';
import { pokeApi } from '../../../services/pokeApi';
import { useNavigate } from 'react-router-dom';

interface MoveListResult {
    name: string;
    url: string;
}

interface TypeListResult {
    name: string;
    url: string;
}

interface MoveDetail {
    type: {
        name: string;
    }
}

// Sub-component for individual move row to handle fetching type if needed
const MoveItem = ({ move, forcedType }: { move: MoveListResult, forcedType?: string }) => {
    const [type, setType] = useState<string>(forcedType || '');

    useEffect(() => {
        if (forcedType) {
            setType(forcedType);
            return;
        }
        // If no forced type (All view), fetch details
        const fetchDetail = async () => {
            try {
                // Determine ID from URL to use cache-friendly ID fetch if possible, or just use name
                // move.name is reliable.
                const data = await pokeApi.getMove<MoveDetail>(move.name);
                setType(data.type.name);
            } catch (e) {
                console.error("Failed to fetch move type", e);
            }
        };
        fetchDetail();
    }, [move.name, forcedType]);

    // Type Colors (Simplified map)
    const getTypeColor = (type: string) => {
        const colors: Record<string, string> = {
            fire: 'bg-orange-500', water: 'bg-blue-500', grass: 'bg-green-500', electric: 'bg-yellow-400',
            psychic: 'bg-pink-500', ice: 'bg-cyan-300', dragon: 'bg-indigo-600', dark: 'bg-slate-700',
            fairy: 'bg-pink-300', normal: 'bg-gray-400', fighting: 'bg-red-700', flying: 'bg-sky-400',
            poison: 'bg-purple-500', ground: 'bg-amber-700', rock: 'bg-stone-500', bug: 'bg-lime-500',
            ghost: 'bg-indigo-800', steel: 'bg-zinc-400'
        };
        return colors[type] || 'bg-gray-500';
    };

    return (
        <div className="flex items-center justify-between px-3 py-2 bg-white/10 border border-white/30 rounded cursor-pointer hover:bg-white/30 transition-colors">
            <span className="text-white text-xs font-bold uppercase tracking-wider">
                {move.name ? move.name.replace(/-/g, ' ') : 'Unknown'}
            </span>
            {type && (
                <span className={`${getTypeColor(type)} px-1 rounded-full text-[8px] border border-white/10 uppercase items-center`}>
                    {type}
                </span>
            )}
        </div>
    );
};

const AttacksList = () => {
    const [moves, setMoves] = useState<MoveListResult[]>([]);
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
        const fetchMoves = async () => {
            setMoves([]); // Clear current list to avoid confusion
            if (selectedType) {
                const response = await pokeApi.getTypeDetails<{ moves: { name: string, url: string }[] }>(selectedType);
                setMoves(response.moves);
            } else {
                // Reduced limit to 50 to avoid API spam when fetching individual types
                const response = await pokeApi.getMoveList<{ results: MoveListResult[] }>(50, 0);
                setMoves(response.results);
            }
        };
        fetchMoves();
    }, [selectedType]);

    const currentTypeLabel = selectedType ? selectedType.toUpperCase() : 'ALL TYPES';

    return (
        <div className="h-full w-full bg-cyan-400 relative overflow-hidden flex flex-col font-sans">
            {/* Glow Effects */}
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,transparent_0%,rgba(6,182,212,0.5)_100%)] pointer-events-none"></div>

            {/* Header & Filter */}
            <div className="flex justify-between items-center px-4 py-2 bg-cyan-500/80 text-white text-xs font-bold border-b border-cyan-300 relative z-20 shadow-sm backdrop-blur-sm">
                <div onClick={() => navigate('/home')} className="cursor-pointer font-bold text-white hover:text-cyan-100 text-[10px] bg-cyan-700 px-2 py-0.5 rounded border border-cyan-400">
                    BACK
                </div>
                <span>ATTACKS</span>

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

            {/* Scrollable List Area */}
            <div className="flex-1 overflow-y-auto px-4 pb-4 mt-2 relative z-10 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white/50 hover:scrollbar-thumb-white/80">
                <div className="flex flex-col gap-1">
                    {moves.map((move) => (
                        <MoveItem key={move.name} move={move} forcedType={selectedType} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AttacksList;
