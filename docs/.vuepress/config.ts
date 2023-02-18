import { defineUserConfig } from "vuepress";
import theme from "./theme.js";

export default defineUserConfig({
  base: "/fatina-next/",

  locales: {
    "/": {
      lang: "en-US",
      title: "Fatina Documentation",
      description: "",
    },
  },

  theme,

  shouldPrefetch: false,
});
