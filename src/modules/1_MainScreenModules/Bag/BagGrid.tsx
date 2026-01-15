import { useEffect, useState } from 'react';
import { pokeApi } from '../../../services/pokeApi';
import { useNavigate } from 'react-router-dom';
import BagItem from './BagItem';

interface ItemListResult {
    name: string;
    url: string;
}

const BagGrid = () => {
    const [items, setItems] = useState<ItemListResult[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchItems = async () => {
            // Fetch only items that are "holdable-active"
            const response = await pokeApi.getItemAttribute<{ items: ItemListResult[] }>('holdable-active');
            setItems(response.items);
        };
        fetchItems();
    }, []);

    return (
        <div className="h-full w-full bg-cyan-400 relative overflow-hidden flex flex-col font-sans">
            {/* Glow Effects */}
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,transparent_0%,rgba(6,182,212,0.5)_100%)] pointer-events-none"></div>
            {/* Header Info */}
            <div className="flex justify-between items-center px-6 py-2 bg-cyan-500/80 text-white text-xs font-bold border-b border-cyan-300 relative z-10 shadow-sm backdrop-blur-sm">
                <button onClick={() => navigate('/home')} className="cursor-pointer font-bold text-white hover:text-cyan-100 text-[10px] bg-cyan-700 px-2 py-0.5 rounded border border-cyan-400">
                    BACK
                </button>
                <span>ITEMS: {items.length}</span>
                <span>HELD ITEMS</span>
            </div>

            {/* Scrollable Grid Area */}
            <div className="flex-1 overflow-y-auto px-6 pb-4 relative z-10 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white/50 hover:scrollbar-thumb-white/80">
                <div className="grid grid-cols-6 gap-y-2 gap-x-2 mt-5">
                    {items.map((item) => (
                        <BagItem key={item.name} item={item} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default BagGrid;
