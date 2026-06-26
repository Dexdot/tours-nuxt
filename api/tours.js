import client from "~/api/client";
import { cachedFetch } from "~/api/cache";

export const fetchTours = options =>
  cachedFetch(`tour:${JSON.stringify(options)}`, () =>
    client
      .getEntries({
        content_type: "tour",
        ...options
      })
      .then(({ items }) => items.filter(tour => "fields" in tour))
  );
