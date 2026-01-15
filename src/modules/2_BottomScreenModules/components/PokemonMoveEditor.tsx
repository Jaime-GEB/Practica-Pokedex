import { useState, useEffect } from 'react';
import { pokeApi } from '../../../services/pokeApi';
import { type TeamPokemon, useTeamStore } from '../../../store/teamStore';
import CloseIcon from '@mui/icons-material/Close';
import { getTypeColor } from '../../../components/MiscComponents';

interface Props {
    pokemon: TeamPokemon;
    pokemonIndex: number;
    onClose: () => void;
}

const PokemonMoveEditor = ({ pokemon, pokemonIndex, onClose }: Props) => {
    const { updatePokemon } = useTeamStore();
    const [moveDataCache, setMoveDataCache] = useState<{ [key: string]: { description: string, type: string } }>({});
    const [draggingOverSlot, setDraggingOverSlot] = useState<number | null>(null);
    const [hoveredDescription, setHoveredDescription] = useState<string | null>(null);

    // Fetch details (type + description) for current moves
    useEffect(() => {
        const fetchDetails = async () => {
            const newDetails: { [key: string]: { description: string, type: string } } = {};
            for (const moveName of pokemon.moves) {
                if (!moveDataCache[moveName]) {
                    try {
                        const moveData = await pokeApi.getMove(moveName);
                        const entry = moveData.flavor_text_entries.find((e: any) => e.language.name === 'en');
                        newDetails[moveName] = {
                            description: entry ? entry.flavor_text.replace(/\n/g, ' ') : 'No description available.',
                            type: moveData.type.name
                        };
                    } catch (err) {
                        console.error(`Failed to fetch details for ${moveName}`, err);
                    }
                }
            }
            if (Object.keys(newDetails).length > 0) {
                setMoveDataCache(prev => ({ ...prev, ...newDetails }));
            }
        };
        fetchDetails();
    }, [pokemon.moves]);

    const handleDragOver = (e: React.DragEvent, index: number) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'copy';
        setDraggingOverSlot(index);
    };

    const handleDragLeave = (e: React.DragEvent) => {
        e.preventDefault();
        setDraggingOverSlot(null);
    }

    const handleDrop = (e: React.DragEvent, slotIndex: number) => {
        e.preventDefault();
        setDraggingOverSlot(null);
        const moveName = e.dataTransfer.getData('move');

        if (moveName && moveName !== pokemon.moves[slotIndex]) {
            const newMoves = [...pokemon.moves];
            newMoves[slotIndex] = moveName;
            updatePokemon(pokemonIndex, { moves: newMoves });
        }
    };

    return (
        <div className="w-full h-full bg-[#283845] flex flex-col relative font-sans text-white overflow-hidden">

            {/* Header */}
            <div className="bg-[#9C70B5] px-2 py-1 flex justify-between items-center border-b-2 border-[#5E689C] shrink-0">
                <div className="flex items-center gap-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-white drop-shadow-md">MOV. COMBATE</span>
                </div>
                <button onClick={onClose} className="text-white hover:text-red-200 transition-colors">
                    <CloseIcon sx={{ fontSize: 16 }} />
                </button>
            </div>

            <div className="flex flex-1 overflow-hidden">
                {/* Left Column: Pokemon Info */}
                <div className="w-1/3 bg-[#599A8C] p-2 flex flex-col border-r-2 border-[#5E689C] relative shrink-0">
                    {/* Pokemon Index & Icons */}
                    <div className="flex justify-between text-white font-bold text-[10px] mb-1">
                        <span>Nº{pokemon.id.toString().padStart(3, '0')}</span>
                    </div>

                    <div className="bg-[#B9B9C9]/30 rounded-full w-20 h-20 self-center flex items-center justify-center mb-2 border-2 border-white/20 shrink-0">
                        <img src={pokemon.sprite} alt={pokemon.name} className="w-16 h-16 object-contain pixelated relative z-10" />
                    </div>

                    <div className="mt-auto">
                        <h2 className="text-sm font-bold uppercase tracking-wide mb-0.5 truncate">{pokemon.name}</h2>
                        <div className="flex items-center gap-1 mb-1">
                            <div className="bg-zinc-800 rounded-full p-0.5 border border-zinc-600">
                                <div className="w-2 h-2 rounded-full bg-red-500 shadow-inner"></div>
                            </div>
                            <span className="font-bold text-[10px]">Nv. {pokemon.level}</span>
                        </div>

                        <div className="flex gap-1 flex-wrap">
                            {pokemon.types.map(t => (
                                <span key={t} className="px-1 py-px rounded text-[8px] font-bold uppercase text-white shadow-sm border border-white/20" style={{ backgroundColor: getTypeColor(t) }}>
                                    {t}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Column: Moves */}
                <div className="w-2/3 bg-[#283845] p-1 flex flex-col overflow-hidden">

                    {/* Current Moves List */}
                    <div className="flex flex-col gap-1 mb-1 shrink-0">
                        {pokemon.moves.map((move, index) => {
                            const details = moveDataCache[move];
                            return (
                                <div
                                    key={index}
                                    onMouseEnter={() => setHoveredDescription(details?.description || 'Loading...')}
                                    onMouseLeave={() => setHoveredDescription(null)}
                                    onDragOver={(e) => handleDragOver(e, index)}
                                    onDragLeave={handleDragLeave}
                                    onDrop={(e) => handleDrop(e, index)}
                                    className={`relative w-full flex items-center bg-white border rounded p-0.5 group transition-all text-left cursor-default
                                        ${draggingOverSlot === index ? 'border-green-500 ring-2 ring-green-400 z-10 scale-[1.02] bg-green-50' : 'border-zinc-300 hover:border-blue-400'}
                                    `}
                                >
                                    <div className="w-10 flex-shrink-0">
                                        <div
                                            className={`${getTypeColor(details?.type)} text-white text-[7px] font-bold uppercase px-0.5 py-0.5 rounded-full border border-white text-center shadow-sm`}
                                        >
                                            {details ? details.type : '...'}
                                        </div>
                                    </div>
                                    <span className="flex-1 ml-1 font-bold text-gray-800 uppercase text-[10px] truncate">{move}</span>
                                </div>
                            );
                        })}
                    </div>

                    {/* Description Box */}
                    <div className="mt-auto">
                        <div className="bg-white border-2 border-[#6870C0] rounded p-1 h-[75px] flex">
                            <p className={`text-gray-900 font-medium leading-tight
                                ${(!hoveredDescription || hoveredDescription.length < 50) ? 'text-[11px]' :
                                    hoveredDescription.length < 100 ? 'text-[10px]' :
                                        hoveredDescription.length < 150 ? 'text-[9px]' : 'text-[8px]'}
                            `}>
                                {hoveredDescription || "Drag moves from the top screen to replace current attacks."}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PokemonMoveEditor;
