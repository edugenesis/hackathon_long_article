import {Component, createEffect} from 'solid-js';

import './app.css';
import { ContentBlocks } from './services/content_service';
import {ColorModeProvider, ColorModeScript, createLocalStorageManager} from "@kobalte/core";
import {Button} from "@kobalte/core/button";

const scrollOffsetPX = 15;
const scrollFunctionTriggerInterval = 350;

const App: Component = () => {
  function scrollHandler() {
    const newOffset = window.scrollY + scrollOffsetPX;
    scrollTo({
      top: newOffset
    });
  }

  createEffect(() => {
    const interval = setInterval(() => {
      requestAnimationFrame(() => {});
      scrollHandler();
    }, scrollFunctionTriggerInterval);
    return () => clearInterval(interval);
  });
  
    const storageManager = createLocalStorageManager("vite-ui-theme")
    storageManager.set('system');
    
    const toggleColorMode = () => {
        console.log('Current mode:', storageManager.get());
        storageManager.set(storageManager.get() === 'dark' ? 'light' : 'dark');
    };
    
    return (
        <ColorModeProvider storageManager={storageManager}>
            <ColorModeScript />
            <Button onClick={toggleColorMode}>
                {storageManager.get() === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            </Button>
            <ContentBlocks />
        </ColorModeProvider>
    );
};

export default App;
