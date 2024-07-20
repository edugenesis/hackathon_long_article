import { Component, createEffect } from 'solid-js';
import './app.css';
import { ContentApiBlocks, ContentBlocks } from './components/ContentBlocks';
import { Header } from '~/components/Header';
import { shouldntScroll, scrollHandler, scrollFunctionTriggerInterval } from '~/lib/auto_scroll';

const App: Component = () => {
  createEffect(() => {
    if (sessionStorage.getItem('firstVisit') === 'true') {
      alert('RELOAD!');
      sessionStorage.removeItem('firstVisit');
    }

    sessionStorage.setItem('firstVisit', 'true');
  });

  createEffect(() => {
    if (shouldntScroll()) return;

    const scrollInterval = setInterval(() => {
      requestAnimationFrame(() => {});
      scrollHandler();
    }, scrollFunctionTriggerInterval);

    return () => clearInterval(scrollInterval);
  });

  return (
    <>
      <Header />
      <ContentBlocks />
    </>
  );
};

export default App;
