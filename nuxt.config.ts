// https://nuxt.com/docs/api/configuration/nuxt-config
import Aura from "@primeuix/themes/aura";
import tailwindcss from "@tailwindcss/vite";

const config = {
  baseURL: process.env.BASE_URL || "/",
  crawlerEpubApiUrl: process.env.EPU_CRAWL_API_URL || "http://localhost:5555/",
};

export default defineNuxtConfig({
  srcDir: "src",
  app: {
    baseURL: config.baseURL,
  },
  runtimeConfig: {
    public: {
      crawlerEpubApiUrl: config.crawlerEpubApiUrl,
    },
  },
  nitro: {
    prerender: {
      crawlLinks: false,
      failOnError: false,
      routes: ["/404.html", "/200.html", "/"],
    },
  },
  imports: {
    autoImport: false,
  },
  plugins: ["@/plugins/tooltip", "~/plugins/toastservice"],
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
        },
      },
    },
  },
});
