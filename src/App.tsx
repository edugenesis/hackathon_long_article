import { Component, createEffect, createMemo } from 'solid-js';
import './app.css';
import { ContentBlocks } from './components/ContentBlocks';
import { Header } from '~/components/Header';
import { ScrollSwitch } from '~/components/ScrollSwitch';

const App: Component = () => {
  createEffect(() => {
    if (sessionStorage.getItem('firstVisit') === 'true') {
      alert('RELOAD!');
      sessionStorage.removeItem('firstVisit');
    }
    sessionStorage.setItem('firstVisit', 'true');
  });

  return (
    <>
      <ScrollSwitch />
      <Header />
      <ContentBlocks />
    </>
  );
};

export default App;
