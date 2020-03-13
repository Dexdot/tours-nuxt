import client from "~/api/client";

// Articles
export const fetchArticles = options =>
  new Promise(resolve => {
    client
      .getEntries({
        content_type: "article",
        ...options
      })
      .then(async ({ items }) => {
        const articles = items.filter(article => "fields" in article);
        resolve(articles);
      });
  });
