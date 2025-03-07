import { Routes, Route } from 'react-router';
import App from './App';
import { TrainersList, Trainer, PokemonList, Pokemon, NotFound } from './components';

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
            <Route path='/*' element={<NotFound />} />
        </Routes>
    )
}