import { useTeamStore, type TeamPokemon } from '../../../store/teamStore';
import { pokeApi } from '../../../services/pokeApi';
import CloseIcon from '@mui/icons-material/Close';
import { useState } from 'react';

import PokemonMoveEditor from './PokemonMoveEditor';

const PokemonTeam = () => {
    const { party, addToTeam, removeFromTeam, setItem, selectedMemberIndex, setSelectedMember } = useTeamStore();
    const [loading, setLoading] = useState(false);

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'copy';
    };

    const handleContainerDrop = async (e: React.DragEvent) => {
        e.preventDefault();
        const data = e.dataTransfer.getData('pokemon');
        if (!data) return; // Only handle Pokemon drops here

        try {
            const { id } = JSON.parse(data) as { id: number };
            setLoading(true);

            const pokemonData = await pokeApi.getPokemon(id);

            const allMoves = pokemonData.moves.map((m: any) => m.move.name);
            const selectedMoves = allMoves.sort(() => 0.5 - Math.random()).slice(0, 4);

            const newMember: TeamPokemon = {
                id: pokemonData.id,
                name: pokemonData.name,
                sprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonData.id}.png`,
                level: 60,
                hp: { current: pokemonData.stats[0].base_stat * 2, max: pokemonData.stats[0].base_stat * 2 },
                moves: selectedMoves,
                item: null,
                types: pokemonData.types.map((t: any) => t.type.name)
            };

            addToTeam(newMember);

        } catch (err) {
            console.error("Failed to add to team", err);
        } finally {
            setLoading(false);
        }
    };

    const handleSlotDrop = (e: React.DragEvent, index: number) => {
        const itemData = e.dataTransfer.getData('item');
        if (itemData) {
            e.preventDefault();
            e.stopPropagation(); // Prevent container drop
            try {
                const { name } = JSON.parse(itemData) as { name: string };
                setItem(index, name);
            } catch (err) {
                console.error("Failed to set item", err);
            }
        }
    };

    if (selectedMemberIndex !== null && party[selectedMemberIndex]) {
        return (
            <div className="h-full w-full bg-zinc-900 border-2 border-zinc-600 rounded-lg overflow-hidden">
                <PokemonMoveEditor
                    pokemon={party[selectedMemberIndex]!}
                    pokemonIndex={selectedMemberIndex}
                    onClose={() => setSelectedMember(null)}
                />
            </div>
        );
    }

    return (
        <button
            onDragOver={handleDragOver}
            onDrop={handleContainerDrop}
            className="h-full w-full bg-zinc-900 border-2 border-zinc-600 rounded-lg p-1 grid grid-cols-2 grid-rows-3 gap-1 relative"
        >
            {loading && <div className="absolute inset-0 bg-black/50 z-20 flex items-center justify-center text-white text-xs font-bold animate-pulse">ADDING...</div>}

            {party.map((slot, index) => (
                <button key={index + 1} className="bg-zinc-800 border border-zinc-600 rounded relative overflow-hidden group">
                    {slot ? (
                        <button
                            className="flex w-full h-full items-center p-1 relative"
                            onDragOver={handleDragOver}
                            onDrop={(e) => handleSlotDrop(e, index)}
                            onClick={() => setSelectedMember(index)}
                        >
                            <div className="absolute left-0 bottom-0 w-15 h-15 shrink-0 animate-bounce-slow">
                                <img src={slot.sprite} alt={slot.name} className="w-full h-full object-contain pixelated" />
                            </div>

                            <div className="flex-1 ml-1 flex flex-col justify-center gap-0.5 z-10">
                                <div className="flex justify-between items-end leading-none">
                                    <span className="text-[9px] text-white font-bold uppercase truncate w-14 ml-11">{slot.name}</span>
                                    <span className="text-[8px] text-yellow-400 font-bold mr-1">Lv.{slot.level}</span>
                                </div>

                                <div className="w-27 bg-zinc-900 h-1.5 rounded-full border border-zinc-600 relative overflow-hidden mt-0.5 ml-11">
                                    <div className="h-full bg-green-500 w-full"></div>
                                </div>
                                <div className="text-[7px] text-zinc-400 text-right leading-none mt-px mr-1">
                                    {slot.hp.current}/{slot.hp.max}
                                </div>
                            </div>

                            {/* Held Item Icon */}
                            <div className="absolute bottom-1 left-9 bg-zinc-900/80 rounded w-4 h-4 border border-zinc-600 flex items-center justify-center">
                                {slot.item && (
                                    <img
                                        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/${slot.item}.png`}
                                        alt={slot.item}
                                        className="w-full h-full object-contain"
                                        title={slot.item}
                                    />
                                )}
                            </div>

                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    removeFromTeam(index);
                                }}
                                className="absolute top-1 left-1 bg-red-500 rounded-full h-4 w-4 flex items-center justify-center text-white p-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                                <CloseIcon style={{ fontSize: 6 }} />
                            </button>
                        </button>
                    ) : (
                        <div className="h-full w-full flex items-center justify-center border-2 border-dashed border-zinc-700 bg-zinc-800/50 text-zinc-600 text-[9px] font-bold select-none">
                            EMPTY
                        </div>
                    )}
                </button>
            ))}
        </button>
    );
};

export default PokemonTeam;
