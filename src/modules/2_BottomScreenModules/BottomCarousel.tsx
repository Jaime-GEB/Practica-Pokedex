import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import { useCarouselStore } from '../../store/carouselStore';
import Clock from './components/Clock';
import PokemonTeam from './components/PokemonTeam';
import Map from './components/Map';

const BottomCarousel = () => {
    const { activeModuleIndex, setActiveModuleIndex } = useCarouselStore();

    const components = [
        { component: <Clock />, label: "CLOCK" },
        { component: <PokemonTeam />, label: "TEAM" },
        { component: <Map />, label: "MAP" }
    ];

    const handlePrev = () => {
        setActiveModuleIndex((activeModuleIndex - 1 + components.length) % components.length);
    };

    const handleNext = () => {
        setActiveModuleIndex((activeModuleIndex + 1) % components.length);
    };

    const ActiveComponent = components[activeModuleIndex].component;

    return (
        <div className="h-full w-full relative flex flex-col group">
            {/* Main Content Area */}
            <div className="flex-1 overflow-hidden relative">
                {ActiveComponent}
            </div>

            {/* Navigation HUD */}
            <div className="flex justify-center gap-1 p-1 bg-zinc-200">
                <button onClick={handlePrev} className="h-5 w-4 bg-black/30 hover:bg-black/50 text-white rounded-l flex items-center justify-center transition-colors">
                    <ChevronLeft fontSize="small" />
                </button>
                {components.map((_, idx) => (
                    <div
                        key={idx}
                        className={`w-5 h-5 rounded-full transition-colors ${idx === activeModuleIndex ? 'bg-red-500' : 'bg-zinc-400'}`}
                    />
                ))}
                <button onClick={handleNext} className="h-5 w-4 bg-black/30 hover:bg-black/50 text-white rounded-r flex items-center justify-center transition-colors">
                    <ChevronRight fontSize="small" />
                </button>
            </div>
        </div>
    );
};

export default BottomCarousel;
