import { Component, createEffect } from 'solid-js';
import { storageManager } from './index';
import { useColorMode } from '@kobalte/core';
import './app.css';
import { ContentBlocks } from './services/content_service';
import { ModeToggle } from '~/components/mode-toggle';

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

  return (
    <>
      <ModeToggle />
      <ContentBlocks />
    </>
  );
};

export default App;
