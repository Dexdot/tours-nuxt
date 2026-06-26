import client from "~/api/client";
import { cachedFetch } from "~/api/cache";

export const fetchArticles = options =>
  cachedFetch(`article:${JSON.stringify(options)}`, () =>
    client
      .getEntries({
        content_type: "article",
        ...options
      })
      .then(({ items }) => items.filter(article => "fields" in article))
  );
