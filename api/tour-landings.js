import client from "~/api/client";
import { cachedFetch } from "~/api/cache";

export const fetchTourLandings = options =>
  cachedFetch(`corpTour:${JSON.stringify(options)}`, () =>
    client
      .getEntries({
        content_type: "corpTour",
        ...options
      })
      .then(({ items }) => items.filter(tour => "fields" in tour))
  );
