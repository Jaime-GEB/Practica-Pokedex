import { useEffect, useState } from 'react';
import { pokeApi } from '../../../services/pokeApi';
import { useNavigate } from 'react-router-dom';
import MoveItem from '../../../components/MoveItem';
import TypeFilter from '../../../components/TypeFilter';
import { useTeamStore } from '../../../store/teamStore';

interface MoveListResult {
    name: string;
    url: string;
}

const AttacksList = () => {
    const [moves, setMoves] = useState<MoveListResult[]>([]);
    const [selectedType, setSelectedType] = useState<string>('');
    const navigate = useNavigate();
    const { party, selectedMemberIndex } = useTeamStore();

    useEffect(() => {
        const fetchMoves = async () => {
            setMoves([]); // Clear current list to avoid confusion

            // If a team member is selected, fetch their learnable moves
            if (selectedMemberIndex !== null && party[selectedMemberIndex]) {
                const pokemonId = party[selectedMemberIndex]!.id;
                try {
                    const data = await pokeApi.getPokemon(pokemonId);
                    // Filter by type if selected, otherwise show all learnable moves
                    let learnableMoves = data.moves.map((m: any) => m.move);

                    if (selectedType) {
                        // We need to fetch move details to check type, which is expensive for all moves.
                        // Ideally, we'd handle this differently or accept that we only filter if we persist types.
                        // For now, let's just fetch all learnable moves and let the user scroll, 
                        // OR fallback to fetching ALL moves of that type and intersecting (better).
                        const typeResponse = await pokeApi.getTypeDetails<{ moves: { name: string, url: string }[] }>(selectedType);
                        const typeMoveNames = new Set(typeResponse.moves.map(m => m.name));
                        learnableMoves = learnableMoves.filter((m: any) => typeMoveNames.has(m.name));
                    }

                    setMoves(learnableMoves);
                } catch (err) {
                    console.error("Failed to fetch pokemon moves", err);
                }
                return;
            }

            // Default behavior (no team member selected)
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
    }, [selectedType, selectedMemberIndex, party]);


    return (
        <div className="h-full w-full bg-cyan-400 relative overflow-hidden flex flex-col font-sans">
            {/* Glow Effects */}
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,transparent_0%,rgba(6,182,212,0.5)_100%)] pointer-events-none"></div>

            {/* Header & Filter */}
            <div className="flex justify-between items-center px-4 py-2 bg-cyan-500/80 text-white text-xs font-bold border-b border-cyan-300 relative z-20 shadow-sm backdrop-blur-sm">
                <button onClick={() => navigate('/home')} className="cursor-pointer font-bold text-white hover:text-cyan-100 text-[10px] bg-cyan-700 px-2 py-0.5 rounded border border-cyan-400">
                    BACK
                </button>
                <span>ATTACKS</span>

                <TypeFilter selectedType={selectedType} onSelect={setSelectedType} />
            </div>

            {/* Scrollable List Area */}
            <div className="flex-1 overflow-y-auto px-4 pb-4 mt-2 relative z-10 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white/50 hover:scrollbar-thumb-white/80">
                <div className="flex flex-col gap-1">
                    {moves.map((move) => (
                        <div key={move.name} draggable onDragStart={(e) => e.dataTransfer.setData('move', move.name)}>
                            <MoveItem move={move} forcedType={selectedType} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AttacksList;
