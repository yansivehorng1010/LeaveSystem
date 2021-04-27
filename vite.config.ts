import { defineConfig } from 'vite';
import path from 'path';
import reactRefresh from '@vitejs/plugin-react-refresh';

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      Icons: path.resolve(__dirname, './src/Icons'),
      Login: path.resolve(__dirname, './src/Login'),
      Components: path.resolve(__dirname, './src/Components'),
      Company: path.resolve(__dirname, './src/Company'),
    },
  },
  plugins: [reactRefresh()],
});
