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
import { useEffect } from 'react';
import { navigationService } from './utils/navigation';

export default function AppRoutes() {
    const navigate = useNavigate();

    // Setup navigation service to be used in redux middlewares.
    useEffect(() => {
        navigationService.setNavigator(navigate);
    }, [navigate]);

    return (
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
    );
}