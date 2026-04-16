import { type PokemonData } from '../../../../types/types';

interface PokemonSpritePanelProps {
    pokemon: PokemonData;
    evolutionLevel: string;
}

const PokemonSpritePanel = ({ pokemon, evolutionLevel }: PokemonSpritePanelProps) => {
    return (
        <div className="w-[42%] flex flex-col gap-2">
            {/* Sprite Box */}
            <div className="flex-3 bg-white/10 border border-white/40 relative overflow-hidden rounded-lg flex items-center justify-center shadow-inner">
                <div className="absolute inset-0 opacity-20 bg-[linear-gradient(rgba(255,255,255,0.2)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.2)_1px,transparent_1px)] bg-size[10px_10px]"></div>
                <img 
                    src={pokemon.sprites.other['official-artwork'].front_default} 
                    alt={pokemon.name} 
                    className="w-full h-full object-contain p-2 drop-shadow-xl" 
                />
            </div>

            {/* Name / Info Box */}
            <div className="flex-1 bg-cyan-700/50 border border-cyan-300 rounded-lg p-2 flex flex-col justify-between shadow-md backdrop-blur-sm">
                <div className="flex justify-center items-center">
                    <div className="flex gap-x-2 text-[10px] items-center justify-center">
                        <div className="flex justify-between"><span className="text-cyan-100 font-bold">HT: {pokemon.height / 10}m</span></div>
                        <div className="flex justify-between"><span className="text-cyan-100 font-bold">WT: {pokemon.weight / 10}kg</span></div>
                    </div>
                </div>
                <div className="h-px bg-white/30 my-0.5"></div>

                <div className="flex justify-between items-center bg-black/20 rounded px-1.5 py-1 mt-auto">
                    <span className="text-[9px] text-cyan-100 font-bold">NEXT LV.</span>
                    <span className="text-[10px] font-bold text-yellow-300">{evolutionLevel !== '-' ? evolutionLevel : 'MAX'}</span>
                </div>
            </div>
        </div>
    );
};

export default PokemonSpritePanel;
