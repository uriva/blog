import { Replacer } from "./md-replacer";

/** @type import("vitepress").MarkdownOptions */
export const Markdown = {
  config: installPlugins,
  attrs: { disable: true }, // https://github.com/vuejs/vitepress/issues/2440
};

/** @return import("vitepress").MarkdownRenderer */
function installPlugins(md) {
  md.use(Replacer(/\[!!(.+?)]/, buildYouTubeTags));
}

/** @param {string[]} match */
function buildYouTubeTags(match) {
  const source = `https://www.youtube-nocookie.com/embed/${match[1]}`;
  return `<span class="youtube"><iframe src="${source}" allowfullscreen width="688" height="387"></iframe></span>`;
}
