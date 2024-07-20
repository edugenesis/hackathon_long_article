import { Component, createEffect } from 'solid-js';
import './app.css';
import {ContentApiBlocks, ContentBlocks} from './components/ContentBlocks';
import { Header } from '~/components/Header';
import { shouldAutoScroll, scrollHandler, scrollFunctionTriggerInterval } from '~/lib/auto_scroll';

const App: Component = () => {
  createEffect(() => {
    window.addEventListener('load', () => {
      alert('LOAD EVENT TRIGGERED');
    });
  });

  createEffect(() => {
    if (!shouldAutoScroll()) return;

    const scrollInterval = setInterval(() => {
      requestAnimationFrame(() => {});
      scrollHandler();
    }, scrollFunctionTriggerInterval);

    return () => clearInterval(scrollInterval);
  });

  return (
    <>
      <Header />
      <ContentBlocks/>
    </>
  );
};

export default App;
