import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import { resolve } from "path";

export default defineConfig({
  base: "/TP3_PicheTristan/",

  plugins: [tailwindcss()],

  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        apropos: resolve(__dirname, "apropos.html"),
        contact: resolve(__dirname, "contact.html"),
        reservation: resolve(__dirname, "reservation.html"),
      },
    },
  },
});
