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

export const fetchArticle = ({ slug, locale }) =>
  new Promise((resolve, reject) => {
    client
      .getEntries({
        content_type: "article",
        "fields.slug": slug,
        locale
      })
      .then(({ items }) => {
        const article = items[0] && "fields" in items[0] ? items[0] : null;

        if (article) {
          resolve(article);
        } else {
          reject();
        }
      });
  });
