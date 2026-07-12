import { defineNuxtConfig } from 'nuxt/config';

export default defineNuxtConfig({
  compatibilityDate: '2026-03-31',
  future: {
    compatibilityVersion: 5,
  },
  devtools: {
    enabled: false,
  },
  css: ['~/assets/css/main.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  modules: ['@nuxtjs/tailwindcss'],
  typescript: {
    strict: true,
    typeCheck: true,
    tsConfig: {
      compilerOptions: {
        jsx: 'preserve',
        jsxImportSource: 'vue',
      },
    },
  },
  app: {
    head: {
      title: 'ЭвоСтройТех',
      meta: [
        {
          name: 'description',
          content:
            'Архитектурный лендинг ЭвоСтройТех о технологии SCIP, авторском проектировании и строительстве.',
        },
      ],
    },
  },
});
