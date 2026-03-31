import type { Config } from 'tailwindcss';

export default {
  content: [
    './app.vue',
    './components/**/*.{js,jsx,ts,tsx,vue}',
    './pages/**/*.{js,jsx,ts,tsx,vue}',
    './data/**/*.{js,ts}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
} satisfies Config;
