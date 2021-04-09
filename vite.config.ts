import { defineConfig } from 'vite';
import path from 'path';
import reactRefresh from '@vitejs/plugin-react-refresh';

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      Testing: path.resolve(__dirname, './src/Testing'),
      Login: path.resolve(__dirname, './src/Login'),
      Page: path.resolve(__dirname, './src/Page'),
      LinkPage: path.resolve(__dirname, './src/LinkPage'),
    },
  },
  plugins: [reactRefresh()],
});
