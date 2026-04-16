import { getTypeColor } from '../../../../components/MiscComponents';
import { type PokemonData } from '../../../../types/types';

interface PokemonDataPanelProps {
    pokemon: PokemonData;
    abilityDesc: string;
    flavorText: string;
}

const PokemonDataPanel = ({ pokemon, abilityDesc, flavorText }: PokemonDataPanelProps) => {
    return (
        <div className="flex-1 flex flex-col h-full justify-between">
            {/* TYPES */}
            <div className="flex items-center justify-end mr-2 gap-x-1 z-25">
                {pokemon.types.map(({ type: { name } }) => (
                    <span key={name} className={`${getTypeColor(name)} px-1 rounded-full text-[7px] border border-white uppercase`}>
                        {name}
                    </span>
                ))}
            </div>

            {/* ABILITY */}
            <div className="bg-white/10 border border-white/30 rounded-lg p-1.5 flex flex-col gap-1 overflow-hidden">
                <div className="text-[10px] font-bold uppercase text-yellow-300 flex items-center justify-between border-b border-white/20 pb-0.5">
                    <span>ABILITY</span>
                    <span className="text-white">{pokemon.abilities[0]?.ability.name.replace('-', ' ')}</span>
                </div>
                <div className="text-[9px] text-white/90 leading-tight line-clamp-2">
                    {abilityDesc}
                </div>
            </div>

            {/* FLAVOR TEXT */}
            <div className="bg-black/20 border border-white/30 rounded-lg p-1.5 h-15 overflow-hidden">
                <div className="text-[9px] text-white leading-snug italic">
                    "{flavorText}"
                </div>
            </div>
        </div>
    );
};

export default PokemonDataPanel;
