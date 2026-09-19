// 保險工具人 · Eleventy 設定
// 輸出與輸入結構一致，保留既有網址（index.html 巢狀目錄）
module.exports = function (eleventyConfig) {
  // 直接複製到輸出的靜態資產
  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addPassthroughCopy("src/learn/car-accident/assets");
  eleventyConfig.addPassthroughCopy("src/tools/mobile-scan/assets");

  // 計算相對路徑前綴：根目錄 ""、一層 "../"、兩層 "../../"
  // page.url 可能為 "/"、"/about/" 或 "/about/index.html" 等型式，先正規化再算深度
  eleventyConfig.addFilter("relbase", function (url) {
    let u = String(url || "/");
    u = u.replace(/(^|\/)index\.html?$/i, "/");
    const parts = u.split("/").filter(Boolean);
    return parts.length === 0 ? "" : "../".repeat(parts.length);
  });

  // 分類頁自動收集：葉子頁面在 front matter 加 tags: toolItem／learnItem，並以 order 排序
  eleventyConfig.addCollection("toolsList", function (api) {
    return api.getFilteredByTag("toolItem").sort((a, b) => (a.data.order || 99) - (b.data.order || 99));
  });
  eleventyConfig.addCollection("learnList", function (api) {
    return api.getFilteredByTag("learnItem").sort((a, b) => (a.data.order || 99) - (b.data.order || 99));
  });

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      layouts: "_includes/layouts",
      data: "_data",
    },
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: false,
  };
};