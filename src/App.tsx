import { Component, createEffect } from 'solid-js';
import { storageManager } from './index';
import { useColorMode } from '@kobalte/core';
import './app.css';
import { ContentBlocks } from './services/content_service';
import { ColorModeProvider, ColorModeScript } from '@kobalte/core';
import { Button } from '@kobalte/core/button';
import { ModeToggle } from '~/components/mode-toggle';

const scrollOffsetPX = 15;
const scrollFunctionTriggerInterval = 100350;

const App: Component = () => {
  const { setColorMode } = useColorMode();

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

  const toggleColorMode = () => {
    setColorMode(storageManager.get() === 'dark' ? 'light' : 'dark');
  };

  return (
    <>
      <ModeToggle />
      <ContentBlocks />
    </>
  );
};

export default App;
