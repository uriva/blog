import { defineConfig } from "vitepress";
import { Markdown } from "./ext/markdown/markdown";

const tagId = "AW-1031308281";

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
  head: [
    [
      "script",
      {
        async: "",
        src: `https://www.googletagmanager.com/gtag/js?id=${tagId}`,
      },
    ],
    [
      "script",
      {},
      `window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${tagId}');`,
    ],
  ],
});
