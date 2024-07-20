import { Component, createEffect, createSignal } from 'solid-js';

import './app.css';
import { ContentBlocks } from './services/content_service';

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
    <div>
      <ContentBlocks />
    </div>
  );
};

export default App;
