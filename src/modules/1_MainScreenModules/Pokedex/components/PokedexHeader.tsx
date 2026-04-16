import { useNavigate } from 'react-router-dom';
import TypeFilter from '../../../../components/TypeFilter';

interface PokedexHeaderProps {
    selectedType: string;
    onTypeSelect: (type: string) => void;
}

const PokedexHeader = ({ selectedType, onTypeSelect }: PokedexHeaderProps) => {
    const navigate = useNavigate();

    return (
        <div className="flex justify-between items-center px-6 py-2 bg-cyan-500/80 text-white text-s font-bold border-b border-cyan-300 relative z-20 shadow-sm backdrop-blur-sm">
            <button 
                onClick={() => navigate('/home')} 
                className="cursor-pointer font-bold text-white hover:text-cyan-100 text-[10px] bg-cyan-700 px-2 py-0.5 rounded border border-cyan-400"
            >
                BACK
            </button>
            <span>Pokedex</span>

            <TypeFilter selectedType={selectedType} onSelect={onTypeSelect} />
        </div>
    );
};

export default PokedexHeader;
