/* @refresh reload */
import { render } from 'solid-js/web';
import { ColorModeProvider, createLocalStorageManager, ColorModeScript } from '@kobalte/core';
import './app.css';
import App from './App';

const root = document.getElementById('root');

if (import.meta.env.DEV && !(root instanceof HTMLElement)) {
  throw new Error(
    'Root element not found. Did you forget to add it to your index.html? Or maybe the id attribute got misspelled?'
  );
}

export const storageManager = createLocalStorageManager('vite-ui-theme');
storageManager.set('system');

render(
  () => (
    <>
      <ColorModeScript storageType={storageManager.type} />
      <ColorModeProvider storageManager={storageManager}>
        <App />
      </ColorModeProvider>
    </>
  ),
  root!
);
