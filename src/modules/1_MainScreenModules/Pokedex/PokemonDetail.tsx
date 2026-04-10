import { useEffect } from 'react';
import { getTypeColor } from '../../../components/MiscComponents';
import DetailsNav from './PokemonDetails/DetailsNav';
import useDetail from './PokemonDetails/hooks/useDetail';

const PokemonDetail = () => {

    const { pokemon, pokemonId, species, abilityDesc, evolutionLevel, loading, fetchData } = useDetail();

    useEffect(() => {
        fetchData();
    }, [pokemonId]);

    if (loading || !pokemon) return <div className="h-full w-full bg-cyan-400 text-white flex items-center justify-center font-bold animate-pulse">LOADING DATA...</div>;

    const flavorText = species?.flavor_text_entries.find((e: any) => e.language.name === 'en')?.flavor_text.replaceAll(/\f/g, ' ') || "No data.";

    return (
        <div className="h-full w-full bg-cyan-400 relative overflow-hidden flex flex-col font-sans text-white select-none">
            {/* Background Glow */}
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,transparent_0%,rgba(6,182,212,0.5)_100%)] pointer-events-none"></div>

            {/* Nav Header */}
            <DetailsNav pokemonId={pokemonId} pokemonName={pokemon.name} />

            {/* Main Content Grid */}
            <div className="flex flex-1 p-2 gap-2 overflow-hidden items-stretch relative z-10">

                {/* LEFT COL: Sprite & Basic Info */}
                <div className="w-[42%] flex flex-col gap-2">
                    {/* Sprite Box */}
                    <div className="flex-3 bg-white/10 border border-white/40 relative  overflow-hidden rounded-lg flex items-center justify-center shadow-inner">
                        <div className="absolute inset-0 opacity-20 bg-[linear-gradient(rgba(255,255,255,0.2)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.2)_1px,transparent_1px)] bg-size[10px_10px]"></div>
                        <img src={pokemon.sprites.other['official-artwork'].front_default} alt={pokemon.name} className="w-full h-full object-contain p-2 drop-shadow-xl" />
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

                {/* RIGHT COL: Stats & Details */}
                <div className="flex-1 flex flex-col h-full justify-between">
                    {/* TYPES */}
                    <div className="flex items-center justify-end mr-2 gap-x-1 z-25">
                        {pokemon.types.map(({ type: { name } }: any) => (
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
            </div>
        </div>
    );
};

export default PokemonDetail;
