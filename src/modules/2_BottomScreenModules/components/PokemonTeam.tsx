import { useTeamStore, type TeamPokemon } from '../../../store/teamStore';
import { pokeApi } from '../../../services/pokeApi';
import CloseIcon from '@mui/icons-material/Close';
import { useState } from 'react';

const PokemonTeam = () => {
    const { party, addToTeam, removeFromTeam, setItem } = useTeamStore();
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

            const pokemonData = await pokeApi.getPokemon<any>(id);

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
        // If it's a Pokemon drop, let it bubble up to container or handle swap (future)
        // For now, bubbling allows adding new pokemon if dropped on empty slot? 
        // No, container drop adds to *first empty*. 
        // If we drop on a filled slot, current container logic just appends to next empty. That's acceptable.
    };

    const getTypeColorInfo = (type: string) => {
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
        <div
            onDragOver={handleDragOver}
            onDrop={handleContainerDrop}
            className="h-full w-full bg-zinc-900 border-2 border-zinc-600 rounded-lg p-1 grid grid-cols-2 grid-rows-3 gap-1 relative"
        >
            {loading && <div className="absolute inset-0 bg-black/50 z-20 flex items-center justify-center text-white text-xs font-bold animate-pulse">ADDING...</div>}

            {party.map((slot, index) => (
                <div key={index} className="bg-zinc-800 border border-zinc-600 rounded relative overflow-hidden group">
                    {slot ? (
                        <div
                            className="flex w-full h-full items-center p-1 relative"
                            onDragOver={handleDragOver}
                            onDrop={(e) => handleSlotDrop(e, index)}
                        >
                            <div className={`absolute right-0 top-0 bottom-0 w-8 opacity-20 ${getTypeColorInfo(slot.types[0])}`}></div>

                            <div className="w-10 h-10 flex-shrink-0 relative animate-bounce-slow">
                                <img src={slot.sprite} alt={slot.name} className="w-full h-full object-contain pixelated" />
                            </div>

                            <div className="flex-1 ml-1 flex flex-col justify-center gap-0.5 z-10">
                                <div className="flex justify-between items-end leading-none">
                                    <span className="text-[9px] text-white font-bold uppercase truncate w-14">{slot.name}</span>
                                    <span className="text-[8px] text-yellow-400 font-bold">Lv.{slot.level}</span>
                                </div>

                                <div className="w-full bg-zinc-900 h-1.5 rounded-full border border-zinc-600 relative overflow-hidden mt-0.5">
                                    <div className="h-full bg-green-500 w-full"></div>
                                </div>
                                <div className="text-[7px] text-zinc-400 text-right leading-none mt-[1px]">
                                    {slot.hp.current}/{slot.hp.max}
                                </div>
                            </div>

                            {/* Held Item Icon */}
                            <div className="absolute bottom-1 left-9 bg-zinc-900/80 rounded w-3 h-3 border border-zinc-600 flex items-center justify-center">
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
                                onClick={() => removeFromTeam(index)}
                                className="absolute top-1 left-1 bg-red-500 rounded-full h-4 w-4 flex items-center justify-center text-white p-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                                <CloseIcon style={{ fontSize: 6 }} />
                            </button>
                        </div>
                    ) : (
                        <div className="h-full w-full flex items-center justify-center border-2 border-dashed border-zinc-700 bg-zinc-800/50 text-zinc-600 text-[9px] font-bold select-none">
                            EMPTY
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default PokemonTeam;
