import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux';
import { store } from "./app/store";
import { BrowserRouter } from 'react-router';
import ThemeProvider from './components/ThemeProvider';
import AppRoutes from './routes';
import { Analytics } from "@vercel/analytics/react"
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <ThemeProvider>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
    <Analytics />
  </StrictMode>,
)
