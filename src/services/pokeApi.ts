import axios, { type AxiosResponse } from 'axios';

const api = axios.create({
    baseURL: 'https://pokeapi.co/api/v2',
    timeout: 10000,
});

export const pokeApi = {
    /**
     * Generic get method
     * @param url - endpoint url
     * @returns Promise with data of type T
     */
    get: async <T>(url: string): Promise<T> => {
        const response: AxiosResponse<T> = await api.get(url);
        return response.data;
    },

    /**
     * Get Pokemon by name or ID
     * @param nameOrId - Pokemon name or ID
     */
    getPokemon: async <T = any>(nameOrId: string | number): Promise<T> => {
        return pokeApi.get<T>(`/pokemon/${nameOrId}`);
    },

    /**
     * Get a list of Pokemon
     * @param limit - Number of results
     * @param offset - Offset for pagination
     */
    getPokemonList: async <T = any>(limit: number = 20, offset: number = 0): Promise<T> => {
        return pokeApi.get<T>(`/pokemon?limit=${limit}&offset=${offset}`);
    },

    /**
     * Get a list of Items
     */
    getItemList: async <T = any>(limit: number = 50, offset: number = 0): Promise<T> => {
        return pokeApi.get<T>(`/item?limit=${limit}&offset=${offset}`);
    },

    /**
     * Get a list of Moves
     */
    getMoveList: async <T = any>(limit: number = 50, offset: number = 0): Promise<T> => {
        return pokeApi.get<T>(`/move?limit=${limit}&offset=${offset}`);
    },

    /**
     * Get Move details
     */
    getMove: async <T = any>(nameOrId: string | number): Promise<T> => {
        return pokeApi.get<T>(`/move/${nameOrId}`);
    },

    /**
     * Get Item details
     */
    getItem: async <T = any>(nameOrId: string | number): Promise<T> => {
        return pokeApi.get<T>(`/item/${nameOrId}`);
    },

    /**
     * Get a list of Types
     */
    getTypesList: async <T = any>(): Promise<T> => {
        return pokeApi.get<T>(`/type`);
    },

    /**
     * Get Type details (includes pokemon and moves)
     */
    getTypeDetails: async <T = any>(nameOrId: string | number): Promise<T> => {
        return pokeApi.get<T>(`/type/${nameOrId}`);
    },

    /**
     * Get Item Attribute details (allows filtering items by category like 'holdable-active')
     */
    getItemAttribute: async <T = any>(nameOrId: string | number): Promise<T> => {
        return pokeApi.get<T>(`/item-attribute/${nameOrId}`);
    },

    /**
     * Get Pokemon Species details (flavor text, evolution chain url)
     */
    getPokemonSpecies: async <T = any>(nameOrId: string | number): Promise<T> => {
        return pokeApi.get<T>(`/pokemon-species/${nameOrId}`);
    },

    /**
     * Get Ability details
     */
    getAbility: async <T = any>(nameOrId: string | number): Promise<T> => {
        return pokeApi.get<T>(`/ability/${nameOrId}`);
    },

    /**
     * Generic fetch by full URL (useful for Evolution Chain)
     */
    getByUrl: async <T = any>(url: string): Promise<T> => {
        // Since api has baseURL set, we need a fresh call or relative path. 
        // But evolution chain comes as full URL 'https://pokeapi.co/...'.
        // We can just use the internal instance but we need to import it or export it.
        // Simplified: use fetch or import axios again.
        // Better: Use the existing 'api' instance but with a hack or just return fetch.
        // Let's Just use the exported 'api' instance from top of file if it was exported? No it's local.
        // We'll update getByUrl to use a fresh request for full URLs.
        const response = await api.get<T>(url);
        return response.data;
    }
};

export default pokeApi;
