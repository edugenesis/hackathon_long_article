import type { Component } from 'solid-js';

import  './app.css';
import { ContentBlocks } from './services/content_service';

const App: Component = () => {
  return (
    <div>
      <ContentBlocks />
    </div>
  );
};

export default App;
