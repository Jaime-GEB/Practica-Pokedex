import { useState, useEffect } from 'react';
import { pokeApi } from '../services/pokeApi';
import { getTypeColor } from './MiscComponents';
import HoverDescription from './HoverDescription';

interface MoveListResult {
    name: string;
    url: string;
}
interface MoveDetail {
    type: {
        name: string;
    };
    flavor_text_entries: {
        flavor_text: string;
        language: {
            name: string;
        };
    }[];
};
const MoveItem = ({ move, forcedType }: { move: MoveListResult, forcedType?: string }) => {

    const [type, setType] = useState<string>('');
    const [description, setDescription] = useState<string>('');

    useEffect(() => {
        if (forcedType) {
            // Still need to fetch description even if type is forced, so we can't just return.
            // But the original code returned if forcedType was present.
            // We need to fetch details for description anyway.
        }

        let isMounted = true;
        const fetchDetail = async () => {
            try {
                const data = await pokeApi.getMove<MoveDetail>(move.name);
                if (isMounted) {
                    setType(data.type.name);
                    const entry = data.flavor_text_entries.find(e => e.language.name === 'en');
                    setDescription(entry?.flavor_text.replaceAll('\n', ' ') || 'No description.');
                }
            } catch (e) {
                console.error("Failed to fetch move detail", e);
            }
        };
        fetchDetail();

        return () => { isMounted = false; };
    }, [move.name, forcedType]);

    const displayType = forcedType || type;

    return (
        <HoverDescription title={move.name.replaceAll('-', ' ')} description={description}>
            <div className="flex items-center justify-between px-3 py-2 bg-white/10 border border-white/30 rounded cursor-pointer hover:bg-white/30 transition-colors">
                <span className="text-white text-xs font-bold uppercase tracking-wider">
                    {move.name ? move.name.replaceAll('-', ' ') : 'Unknown'}
                </span>
                {displayType && (
                    <span className={`${getTypeColor(displayType)} px-1 rounded-full text-[8px] border border-white uppercase items-center justify-center flex h-4 shadow-2xl`}>
                        <p className='mb-0.5'>{displayType}</p>
                    </span>
                )}
            </div>
        </HoverDescription>
    );
};
export default MoveItem;