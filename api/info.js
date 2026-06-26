import client from "~/api/client";
import { cachedFetch } from "~/api/cache";

export const fetchInfoPages = options =>
  cachedFetch(`info:${JSON.stringify(options)}`, () =>
    client
      .getEntries({
        content_type: "info",
        ...options
      })
      .then(({ items }) => items.filter(infoPage => "fields" in infoPage))
  );
