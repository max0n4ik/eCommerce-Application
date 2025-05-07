import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

const rootElement =
  document.querySelector('#root') ??
  ((): HTMLDivElement => {
    const element = document.createElement('div');
    element.id = 'root';
    document.body.append(element);
    return element;
  })();

createRoot(rootElement).render(<StrictMode></StrictMode>);
