import { useState, useEffect } from 'react';
import { pokeApi } from '../../../services/pokeApi';
import HoverDescription from '../../../components/HoverDescription';

interface ItemListResult {
    name: string;
    url: string;
}

interface BagItemProps {
    item: ItemListResult;
}

interface ItemDetail {
    flavor_text_entries: {
        text: string;
        language: {
            name: string;
        };
    }[];
}

const BagItem = ({ item }: BagItemProps) => {
    const [description, setDescription] = useState<string>('');

    useEffect(() => {
        let isMounted = true;
        const fetchDetail = async () => {
            try {
                const data = await pokeApi.getItem<ItemDetail>(item.name);
                if (isMounted) {
                    const entry = data.flavor_text_entries.find((e) => e.language.name === 'en');
                    setDescription(entry?.text.replaceAll('\n', ' ') || 'No description available.');
                }
            } catch (e) {
                console.error("Failed to fetch item description", e);
            }
        };
        fetchDetail();

        return () => { isMounted = false; };
    }, [item.name]);

    return (
        <HoverDescription title={item.name} description={description}>
            <button
                draggable={true}
                onDragStart={(e) => {
                    e.dataTransfer.setData('item', JSON.stringify({ name: item.name }));
                    e.dataTransfer.effectAllowed = 'copy';
                }}
                className="flex flex-col items-center my-1 border border-white/50 justify-center group cursor-pointer hover:scale-110 transition-transform p-1 active:cursor-grabbing w-full h-full"
            >
                <div className="w-8 h-8 flex items-center justify-center relative bg-white/10 rounded-full">
                    <img
                        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/${item.name}.png`}
                        alt={item.name}
                        className="w-full h-full object-contain image-pixelated drop-shadow-md"
                        loading="lazy"
                        onError={(e) => {
                            (e.target as HTMLImageElement).style.display = 'none';
                        }}
                    />
                </div>
            </button>
        </HoverDescription>
    );
};

export default BagItem;
