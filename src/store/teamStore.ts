import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface TeamPokemon {
    id: number;
    name: string;
    sprite: string;
    level: number;
    hp: { current: number; max: number };
    moves: string[]; // 4 slots
    item: string | null;
    types: string[];
}

interface TeamStore {
    party: (TeamPokemon | null)[];
    addToTeam: (pokemon: TeamPokemon) => boolean;
    removeFromTeam: (index: number) => void;
    setItem: (index: number, item: string | null) => void;
    clearTeam: () => void;
}

export const useTeamStore = create<TeamStore>()(
    persist(
        (set, get) => ({
            party: Array(6).fill(null), // Fixed 6 slots

            addToTeam: (pokemon) => {
                const { party } = get();
                const firstEmptyIndex = party.findIndex(p => p === null);

                if (firstEmptyIndex !== -1) {
                    const newParty = [...party];
                    newParty[firstEmptyIndex] = pokemon;
                    set({ party: newParty });
                    return true;
                }
                return false; // Team full
            },

            removeFromTeam: (index) => {
                const { party } = get();
                if (index >= 0 && index < 6) {
                    const newParty = [...party];
                    newParty[index] = null;
                    set({ party: newParty });
                }
            },

            setItem: (index, item) => {
                const { party } = get();
                if (index >= 0 && index < 6 && party[index]) {
                    const newParty = [...party];
                    // Create a shallow copy of the pokemon object to update item
                    newParty[index] = { ...party[index]!, item };
                    set({ party: newParty });
                }
            },

            clearTeam: () => set({ party: Array(6).fill(null) })
        }),
        {
            name: 'pokemon-team-storage',
        }
    )
);
