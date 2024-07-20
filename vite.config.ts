import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';
import path from 'path';
import { partytownVite } from '@builder.io/partytown/utils';

export default defineConfig({
  plugins: [
    solidPlugin(),
    partytownVite({
      dest: path.join(__dirname, 'dist', '~partytown')
    })
  ],
  server: {
    port: 3000
  },
  build: {
    target: 'esnext'
  },
  resolve: {
    alias: {
      '~': path.resolve(__dirname, './src')
    }
  }
});
