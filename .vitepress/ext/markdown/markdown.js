import { AppendIconToExternalLinks } from "./md-link";
import { Replacer } from "./md-replacer";

/** @type import("vitepress").MarkdownOptions */
export const Markdown = {
    config: installPlugins,
    theme: "../../../docs/.vitepress/ext/language/naniscript-theme",
    attrs: { disable: true } // https://github.com/vuejs/vitepress/issues/2440
};

/** @return import("vitepress").MarkdownRenderer */
function installPlugins(md) {
    md.disable(["image"]);
    md.use(Replacer(/\[@(\w+?)]/, buildCommandTags));
    md.use(Replacer(/!\[(.*?)]\((.+?)\)/m, buildImageTags));
    md.use(Replacer(/\[!!(.+?)]/, buildYouTubeTags));
    md.use(Replacer(/\[!(\S+?)]/, buildVideoTags));
    md.use(AppendIconToExternalLinks);
}

/** @param {string[]} match
 *  @param import("vitepress").MarkdownEnv env */
function buildCommandTags(match, env) {
    let url = `/api/#${match[1].toLowerCase()}`;
    if (env.relativePath.startsWith("ja/")) url = "/ja" + url;
    else if (env.relativePath.startsWith("zh/")) url = "/zh" + url;
    else if (env.relativePath.startsWith("ru/")) url = "/ru" + url;
    return `<a href="${url}" target="_blank"><code>@${match[1]}</code></a>`;
}

/** @param {string[]} match */
function buildImageTags(match) {
    const size = getMediaSize(match[2]);
    return `<img src="${match[2]}" alt="${match[1]}" width="${size.width}" height="${size.height}">`;
}

/** @param {string[]} match */
function buildVideoTags(match) {
    const size = getMediaSize(match[1]);
    const source = `<source src="${match[1]}" type="video/mp4">`;
    return `<video class="video" loop autoplay muted playsinline width="${size.width}" height="${size.height}">${source}</video>`;
}

/** @param {string[]} match */
function buildYouTubeTags(match) {
    const source = `https://www.youtube-nocookie.com/embed/${match[1]}`;
    return `<span class="youtube"><iframe src="${source}" allowfullscreen width="688" height="387"></iframe></span>`;
}

/** @param {string} uri */
function getMediaSize(uri) {
    const start = uri.lastIndexOf("?");
    const url = new URL("https://domain.com" + uri.substring(start));
    return { width: url.searchParams.get("width"), height: url.searchParams.get("height") };
}
