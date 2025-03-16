import { Routes, Route, useNavigate } from 'react-router';
import App from './App';
import { 
    TrainersList, 
    Trainer, 
    TrainerForm, 
    PokemonList, 
    Pokemon, 
    PokemonForm, 
    NotFound, 
    ErrorComponent 
} from './components';
import { Toaster } from 'sonner';
import { useEffect } from 'react';
import { navigationService } from './utils/navigation';
import { useMediaQuery } from '@custom-react-hooks/use-media-query';
import { useAppSelector } from './app/hooks';
import { getResolvedTheme } from './features/darkMode/darkModeSlice';

export default function AppRoutes() {
    const navigate = useNavigate();
    const isDesktop = useMediaQuery('(min-width: 768px)');
    const resolvedTheme = useAppSelector(getResolvedTheme);

    // Setup navigation service to be used in redux middlewares.
    useEffect(() => {
        navigationService.setNavigator(navigate);
    }, [navigate]);

    return (
        <>
            <Routes>
                <Route path='/' element={<App />} />
                <Route path='/trainers'>
                    <Route index element={<TrainersList />} />
                    <Route path='/trainers/:trainerId' element={<Trainer />} />
                </Route>
                <Route path='/pokemon'>
                    <Route index element={<PokemonList />} />
                    <Route path='/pokemon/:pokemonId' element={<Pokemon />} />
                </Route>
                <Route path='/trainer-form' element={<TrainerForm />} />
                <Route path='/pokemon-form' element={<PokemonForm />} />
                <Route path='/error' element={<ErrorComponent />} />
                <Route path='/*' element={<NotFound />} />
            </Routes>
            {
                isDesktop ? (
                    <Toaster richColors theme={resolvedTheme} />
                ) : (
                    <Toaster richColors theme={resolvedTheme} position={'top-center'} />
                )
            }
        </>
    );
}