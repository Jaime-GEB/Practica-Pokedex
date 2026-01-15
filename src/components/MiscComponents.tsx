export const getTypeColor = (type: string) => {
    const colors: Record<string, string> = {
        fire: 'bg-orange-500', water: 'bg-blue-500', grass: 'bg-green-500', electric: 'bg-yellow-400',
        psychic: 'bg-pink-500', ice: 'bg-cyan-300', dragon: 'bg-indigo-600', dark: 'bg-slate-700',
        fairy: 'bg-pink-300', normal: 'bg-gray-400', fighting: 'bg-red-700', flying: 'bg-sky-400',
        poison: 'bg-purple-500', ground: 'bg-amber-700', rock: 'bg-stone-500', bug: 'bg-lime-500',
        ghost: 'bg-indigo-800', steel: 'bg-zinc-400'
    };
    return colors[type] || 'bg-gray-500';
};
