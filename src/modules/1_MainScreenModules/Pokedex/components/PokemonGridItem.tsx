import { useNavigate } from 'react-router-dom';

interface PokemonGridItemProps {
    id: string;
    name: string;
}

const PokemonGridItem = ({ id, name }: PokemonGridItemProps) => {
    const navigate = useNavigate();

    const handleDragStart = (e: React.DragEvent) => {
        e.dataTransfer.setData('pokemon', JSON.stringify({ id, name }));
        e.dataTransfer.effectAllowed = 'copy';
    };

    return (
        <button
            onClick={() => navigate(`/pokedex/${id}`)}
            draggable={true}
            onDragStart={handleDragStart}
            className="flex flex-col items-center my-1 border border-white/50 justify-center group cursor-pointer hover:scale-110 transition-transform active:cursor-grabbing"
        >
            <div className="w-10 h-10 flex items-center justify-center relative">
                <img
                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`}
                    alt={name}
                    className="w-full h-full object-contain image-pixelated drop-shadow-md"
                    loading="lazy"
                />
            </div>
        </button>
    );
};

export default PokemonGridItem;
