import { useEffect, useState } from 'react';
import { pokeApi } from '../services/pokeApi';

interface TypeListResult {
    name: string;
    url: string;
}

interface Props {
    onSelect: (type: string) => void;
    selectedType: string;
}

const TypeFilter = ({ onSelect, selectedType }: Props) => {
    const [types, setTypes] = useState<TypeListResult[]>([]);

    useEffect(() => {
        const fetchTypes = async () => {
            const response = await pokeApi.getTypesList<{ results: TypeListResult[] }>();
            setTypes(response.results);
        };
        fetchTypes();
    }, []);

    return (
        <div className="relative">
            <select
                value={selectedType}
                onChange={(e) => onSelect(e.target.value)}
                className="bg-cyan-700 text-white border border-cyan-400 rounded px-3 py-1 text-xs outline-none focus:ring-1 focus:ring-white/50 w-32 flex justify-between items-center"
            >
                <option
                    value=""
                    className="px-3 py-2 cursor-pointer hover:bg-cyan-600 text-white text-xs"
                >
                    ALL TYPES
                </option>
                {types.map(t => (
                    <option
                        key={t.name}
                        value={t.name}
                        className="px-3 py-2 cursor-pointer hover:bg-cyan-600 text-white text-xs uppercase"
                    >
                        {t.name}
                    </option>
                ))}
            </select>
        </div>
    );
}
export default TypeFilter;