// https://nuxt.com/docs/api/configuration/nuxt-config
import Aura from "@primeuix/themes/aura";
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  imports: {
    autoImport: false,
  },
  plugins: [
    '@/plugins/tooltip',
    '~/plugins/toastservice',
  ],
  vite: {
    plugins: [tailwindcss()],
  },
  css: ["~/assets/styles/app.css"],
  compatibilityDate: "2025-05-15",
  devtools: { enabled: true },
  modules: ["@nuxt/eslint", "@primevue/nuxt-module", "@pinia/nuxt"],
  primevue: {
    components: {
      include: [
        "button",
        "inputtext",
        "card",
        "message",
        "form",
        "toast",
        "tooltip",
      ],
    },
    options: {
      theme: {
        preset: Aura,
        options: {
          darkModeSelector: false,
        }
      },
    },
  },
});
