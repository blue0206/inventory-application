import { Routes, Route } from 'react-router';
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

export default function AppRoutes() {
    return (
        <Routes>
            <Route path='/' element={<App />} />
            <Route path='/trainers'>
                <Route index element={<TrainersList />} />
                <Route path='/:trainerId' element={<Trainer />} />
            </Route>
            <Route path='/pokemon'>
                <Route index element={<PokemonList />} />
                <Route path='/:pokemonId' element={<Pokemon />} />
            </Route>
            <Route path='/trainer-form' element={<TrainerForm />} />
            <Route path='/pokemon-form' element={<PokemonForm />} />
            <Route path='/error' element={<ErrorComponent />} />
            <Route path='/*' element={<NotFound />} />
        </Routes>
    );
}