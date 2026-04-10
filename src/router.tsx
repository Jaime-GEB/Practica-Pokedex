import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import PokedexLayout from './layouts/PokedexLayout';
import MainMenu from './modules/1_MainScreenModules/MainMenu';
import BottomCarousel from './modules/2_BottomScreenModules/BottomCarousel';
import PokedexGrid from './modules/1_MainScreenModules/Pokedex/PokedexGrid';
import PokemonDetail from './modules/1_MainScreenModules/Pokedex/PokemonDetail';
import BagGrid from './modules/1_MainScreenModules/Bag/BagGrid';
import AttacksList from './modules/1_MainScreenModules/Attacks/AttacksList';

const router = createBrowserRouter([
    {
        path: '/',
        element: <PokedexLayout topScreen={<MainMenu />} bottomScreen={<BottomCarousel />} />
    },
    {
        path: '/home',
        element: <PokedexLayout topScreen={<MainMenu />} bottomScreen={<BottomCarousel />} />
    },
    // Main Screen Routes
    {
        path: '/pokedex',
        element: <PokedexLayout topScreen={<PokedexGrid />} bottomScreen={<BottomCarousel />} />
    },
    {
        path: '/pokedex/:id',
        element: <PokedexLayout topScreen={<PokemonDetail />} bottomScreen={<BottomCarousel />} />
    },
    {
        path: '/bag',
        element: <PokedexLayout topScreen={<BagGrid />} bottomScreen={<BottomCarousel />} />
    },
    {
        path: '/attacks',
        element: <PokedexLayout topScreen={<AttacksList />} bottomScreen={<BottomCarousel />} />
    }
], { basename: '/Practica-Pokedex' });

const AppRouter = () => {
    return <RouterProvider router={router} />;
};

export default AppRouter;