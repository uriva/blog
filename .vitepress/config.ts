import { defineConfig } from "vitepress";
import { Markdown } from "./ext";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "blog",
  description: "blog",
  base: "/blog/",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [{ text: "Home", link: "/" }],
    sidebar: [],
    socialLinks: [{ icon: "github", link: "https://github.com/uriva/" }],
  },
  markdown: Markdown,
});
