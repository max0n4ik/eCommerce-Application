import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { Button } from '@/components/ui/button';
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
    <div className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground transition-colors p-8">
      <h1 className="text-4xl font-serif mb-4">
        Проверка Tailwind + shadcn Button
      </h1>

      <p className="text-lg mb-8 max-w-lg text-center">
        Этот блок использует <code>bg-background</code> и{' '}
        <code>text-foreground</code>. Кнопки ниже — <strong>Button</strong> из
        библиотеки shadcn/ui.
      </p>

      <div className="flex gap-4">
        <Button variant="default">Default Button</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="destructive">Destructive</Button>
        <Button variant="outline">Outline</Button>
      </div>

      <div className="mt-8 border border-border p-4 rounded-lg w-full max-w-xl">
        <p className="text-muted-foreground mb-2">
          Этот блок с рамкой и цветами muted показывает переменные:
        </p>
        <ul className="list-disc pl-5 text-sm">
          <li>
            <span className="font-semibold">Border:</span> использует переменную{' '}
            <code>--border</code>
          </li>
          <li>
            <span className="font-semibold">Muted:</span> использует{' '}
            <code>--muted</code> и <code>--muted-foreground</code>
          </li>
        </ul>
      </div>
    </div>
  </StrictMode>
);
