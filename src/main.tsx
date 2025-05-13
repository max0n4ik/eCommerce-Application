import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import App from './components/app/app';

import './styles/index.css';

const rootElement =
  document.querySelector('#root') ??
  ((): HTMLDivElement => {
    const element = document.createElement('div');
    element.id = 'root';
    document.body.append(element);
    return element;
  })();

createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>
);
