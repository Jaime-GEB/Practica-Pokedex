import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight } from '@mui/icons-material';

const DetailsNav = ({ pokemonId, pokemonName }: { pokemonId: number, pokemonName: string }) => {
    const navigate = useNavigate();

    const handlePrev = () => {
        if (pokemonId > 1) navigate(`/pokedex/${pokemonId - 1}`);
    };

    const handleNext = () => {
        if (pokemonId < 1350) navigate(`/pokedex/${pokemonId + 1}`);
    };


    return (
        <div className="h-8 bg-cyan-500/80 border-b border-cyan-300 flex justify-between items-center px-3 z-20 shadow-sm backdrop-blur-sm">
            <button onClick={() => navigate('/pokedex')} className="cursor-pointer font-bold text-white hover:text-cyan-100 text-[10px] bg-cyan-700 px-2 py-0.5 rounded border border-cyan-400">
                BACK
            </button>
            <span className="font-bold text-xs uppercase">{pokemonName}</span>
            <div className="flex items-center gap-2">
                <button onClick={handlePrev} className="h-5 w-4 bg-black/30 hover:bg-black/50 text-white rounded-l flex items-center justify-center transition-colors"> <ChevronLeft fontSize="small" /> </button>
                <span className="font-bold text-xs">No. {pokemonId.toString().padStart(3, '0')}</span>
                <button onClick={handleNext} className="h-5 w-4 bg-black/30 hover:bg-black/50 text-white rounded-r flex items-center justify-center transition-colors"> <ChevronRight fontSize="small" /> </button>
            </div>
        </div>
    );
}
export default DetailsNav;