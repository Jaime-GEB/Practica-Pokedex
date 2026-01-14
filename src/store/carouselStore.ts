import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface CarouselState {
    activeModuleIndex: number;
    setActiveModuleIndex: (index: number) => void;
}

export const useCarouselStore = create<CarouselState>()(
    persist(
        (set) => ({
            activeModuleIndex: 0,
            setActiveModuleIndex: (index) => set({ activeModuleIndex: index }),
        }),
        {
            name: 'carousel-storage',
        }
    )
);
