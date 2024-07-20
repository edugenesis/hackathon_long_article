import type { Component } from 'solid-js';

import logo from './logo.svg';
import styles from './App.module.css';
import { ContentBlocks } from './services/content_service';

const App: Component = () => {
  return (
    <div class={styles.App}>
      <ContentBlocks />
    </div>
  );
};

export default App;
