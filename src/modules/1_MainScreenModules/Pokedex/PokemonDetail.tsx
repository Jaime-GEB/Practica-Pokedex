import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { pokeApi } from '../../../services/pokeApi';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

// Interfaces for relevant data
interface PokemonData {
    id: number;
    name: string;
    height: number;
    weight: number;
    stats: { base_stat: number; stat: { name: string } }[];
    types: { type: { name: string } }[];
    abilities: { ability: { name: string; url: string }; is_hidden: boolean }[];
    sprites: { other: { 'official-artwork': { front_default: string } } };
}

interface SpeciesData {
    flavor_text_entries: { flavor_text: string; language: { name: string } }[];
    evolution_chain: { url: string };
}

interface AbilityData {
    effect_entries: { effect: string; short_effect: string; language: { name: string } }[];
}

interface EvolutionChainNode {
    species: { name: string };
    evolves_to: EvolutionChainNode[];
    evolution_details: { min_level: number; trigger: { name: string } }[];
}

const PokemonDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const pokemonId = Number(id);

    const [pokemon, setPokemon] = useState<PokemonData | null>(null);
    const [species, setSpecies] = useState<SpeciesData | null>(null);
    const [abilityDesc, setAbilityDesc] = useState<string>('');
    const [evolutionLevel, setEvolutionLevel] = useState<string>('-');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!pokemonId) return;

        const fetchData = async () => {
            setLoading(true);
            try {
                // 1. Get Pokemon Data
                const pokeData = await pokeApi.getPokemon<PokemonData>(pokemonId);
                setPokemon(pokeData);

                // 2. Get Species Data
                const speciesData = await pokeApi.getPokemonSpecies<SpeciesData>(pokemonId);
                setSpecies(speciesData);

                // 3. Get Ability Data (Primary Ability)
                const mainAbilityUrl = pokeData.abilities[0]?.ability.url;
                if (mainAbilityUrl) {
                    const abilityData = await pokeApi.getByUrl<AbilityData>(mainAbilityUrl);
                    const entry = abilityData.effect_entries.find((e: any) => e.language.name === 'en');
                    setAbilityDesc(entry?.short_effect || entry?.effect || 'No description available.');
                }

                // 4. Get Evolution Chain to find next level
                if (speciesData.evolution_chain?.url) {
                    const evoData = await pokeApi.getByUrl<{ chain: EvolutionChainNode }>(speciesData.evolution_chain.url);
                    const nextLevel = findNextEvolutionLevel(evoData.chain, pokeData.name);
                    setEvolutionLevel(nextLevel ? `Lv. ${nextLevel}` : 'MAX');
                }

            } catch (error) {
                console.error("Error fetching details", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [pokemonId]);

    // Recursive function to find next evolution level
    const findNextEvolutionLevel = (node: EvolutionChainNode, currentName: string): number | null => {
        if (node.species.name === currentName) {
            if (node.evolves_to.length > 0) {
                const levelUp = node.evolves_to.find(evo => evo.evolution_details[0]?.min_level);
                return levelUp?.evolution_details[0]?.min_level || null;
            }
            return null;
        }
        for (const child of node.evolves_to) {
            const found = findNextEvolutionLevel(child, currentName);
            if (found) return found;
        }
        return null;
    };

    const handlePrev = () => {
        if (pokemonId > 1) navigate(`/pokedex/${pokemonId - 1}`);
    };

    const handleNext = () => {
        navigate(`/pokedex/${pokemonId + 1}`);
    };

    if (loading || !pokemon) return <div className="h-full w-full bg-cyan-400 text-white flex items-center justify-center font-bold animate-pulse">LOADING DATA...</div>;

    const flavorText = species?.flavor_text_entries.find(e => e.language.name === 'en')?.flavor_text.replace(/\f/g, ' ') || "No data.";

    // Type Colors (Simplified map for key types)
    const getTypeColor = (type: string) => {
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
        <div className="h-full w-full bg-cyan-400 relative overflow-hidden flex flex-col font-sans text-white select-none">
            {/* Background Glow */}
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,transparent_0%,rgba(6,182,212,0.5)_100%)] pointer-events-none"></div>

            {/* Nav Header */}
            <div className="h-8 bg-cyan-500/80 border-b border-cyan-300 flex justify-between items-center px-3 z-20 shadow-sm backdrop-blur-sm">
                <div onClick={() => navigate('/pokedex')} className="cursor-pointer font-bold text-white hover:text-cyan-100 text-[10px] bg-cyan-700 px-2 py-0.5 rounded border border-cyan-400">
                    BACK
                </div>
                <div className="flex items-center gap-2">
                    <button onClick={handlePrev} className="h-5 w-4 bg-black/30 hover:bg-black/50 text-white rounded-l flex items-center justify-center transition-colors"> <ChevronLeftIcon fontSize="small" /> </button>
                    <span className="font-bold text-xs">No. {pokemon.id.toString().padStart(3, '0')}</span>
                    <button onClick={handleNext} className="h-5 w-4 bg-black/30 hover:bg-black/50 text-white rounded-r flex items-center justify-center transition-colors"> <ChevronRightIcon fontSize="small" /> </button>
                </div>
            </div>

            {/* Main Content Grid */}
            <div className="flex flex-1 p-2 gap-2 overflow-hidden items-stretch relative z-10">

                {/* LEFT COL: Sprite & Basic Info */}
                <div className="w-[42%] flex flex-col gap-2">
                    {/* Sprite Box */}
                    <div className="flex-[3] bg-white/10 border border-white/40 relative  overflow-hidden rounded-lg flex items-center justify-center shadow-inner">
                        <div className="absolute inset-0 opacity-20 bg-[linear-gradient(rgba(255,255,255,0.2)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.2)_1px,transparent_1px)] bg-[size:10px_10px]"></div>
                        <img src={pokemon.sprites.other['official-artwork'].front_default} alt={pokemon.name} className="w-full h-full object-contain p-2 drop-shadow-xl" />
                    </div>

                    {/* Name / Info Box */}
                    <div className="flex-[1] bg-cyan-700/50 border border-cyan-300 rounded-lg p-2 flex flex-col justify-between shadow-md backdrop-blur-sm">
                        <div className="flex justify-between items-center">
                            <span className="text-xs font-bold uppercase">{pokemon.name}</span>

                        </div>
                        <div className="h-[1px] bg-white/30 my-0.5"></div>

                        <div className="flex justify-between items-center bg-black/20 rounded px-1.5 py-1 mt-auto">
                            <span className="text-[9px] text-cyan-100 font-bold">NEXT LV.</span>
                            <span className="text-[10px] font-bold text-yellow-300">{evolutionLevel !== '-' ? evolutionLevel : 'MAX'}</span>
                        </div>
                    </div>
                </div>

                {/* RIGHT COL: Stats & Details */}
                <div className="flex-[1] flex flex-col gap-2 h-full justify-between">

                    {/* PROFILE */}
                    <div className="bg-white/10 border border-white/30 rounded-lg p-1.5 flex flex-col justify-center items-center">
                        <div className="flex gap-x-2 text-[10px]">
                            <div className="flex justify-between"><span className="text-cyan-100 font-bold">HT: {pokemon.height / 10}m</span></div>
                            <div className="flex justify-between"><span className="text-cyan-100 font-bold">WT: {pokemon.weight / 10}kg</span></div>
                            <div className="flex ml-1 items-center gap-x-1" >
                                {pokemon.types.map(({ type: { name } }) => (
                                    <span key={name} className={`${getTypeColor(name)} px-1 rounded-sm text-[5px] border border-white/10 uppercase`}>
                                        {name}
                                    </span>
                                ))}
                            </div>
                        </div>

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
                    <div className="bg-black/20 border border-white/30 rounded-lg p-1.5 h-[60px] overflow-hidden">
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
