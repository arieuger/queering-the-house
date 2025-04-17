import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';
import macrosPlugin from 'vite-plugin-babel-macros';

export default defineConfig({
  plugins: [
    macrosPlugin(),
    sveltekit()
  ],
  test: {
    include: ['src/**/*.{test,spec}.{js,ts}']
  }
});
