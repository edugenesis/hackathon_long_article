import { Component, createEffect } from 'solid-js';
import './app.css';
import { ContentBlocks } from './services/content_service';
import {Header} from "~/components/header";

const scrollOffsetPX = 3;
const scrollFunctionTriggerInterval = 70;

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
      <Header />
      <ContentBlocks />
    </>
  );
};

export default App;
