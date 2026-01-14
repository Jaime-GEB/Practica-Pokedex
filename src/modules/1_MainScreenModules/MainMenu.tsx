import { useNavigate } from 'react-router-dom';

const MainMenu = () => {
    const navigate = useNavigate();

    return (
        <div className="h-full w-full bg-cyan-400 relative overflow-hidden flex flex-col font-sans">
            {/* Background Grid Pattern */}
            <div className="absolute inset-0 opacity-30 bg-[linear-gradient(to_right,rgba(255,255,255,0.4)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.4)_1px,transparent_1px)] bg-[size:40px_40px]"></div>

            {/* Glow Effects */}
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,transparent_0%,rgba(6,182,212,0.5)_100%)] pointer-events-none"></div>

            <div className="h-full w-full flex items-center justify-center p-4 relative z-10">
                <div className="grid grid-cols-3 gap-4 w-full max-w-lg">
                    {/* Menu Item 1 */}
                    <button
                        onClick={() => navigate('/pokedex')}
                        className="aspect-square bg-blue-500 rounded-xl shadow-lg hover:bg-blue-400 active:scale-95 transition-all flex items-center justify-center border-2 border-blue-600"
                    >
                        <span className="text-white font-bold text-lg drop-shadow-md">POKEDEX</span>
                    </button>

                    {/* Menu Item 2 */}
                    <button
                        onClick={() => navigate('/bag')}
                        className="aspect-square bg-red-500 rounded-xl shadow-lg hover:bg-red-400 active:scale-95 transition-all flex items-center justify-center border-2 border-red-600"
                    >
                        <span className="text-white font-bold text-lg drop-shadow-md">BAG</span>
                    </button>

                    {/* Menu Item 3 */}
                    <button
                        onClick={() => navigate('/attacks')}
                        className="aspect-square bg-green-500 rounded-xl shadow-lg hover:bg-green-400 active:scale-95 transition-all flex items-center justify-center border-2 border-green-600"
                    >
                        <span className="text-white font-bold text-lg drop-shadow-md">ATTACKS</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MainMenu;