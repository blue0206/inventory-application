import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux';
import { store } from "./app/store";
import { BrowserRouter } from 'react-router';
import AppRoutes from './routes';
import { Toaster } from 'sonner';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
      <Toaster richColors />
    </Provider>
  </StrictMode>,
)
