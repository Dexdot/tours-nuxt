import client from "~/api/client";

export const fetchTourLandings = options =>
  new Promise(resolve => {
    client
      .getEntries({
        content_type: "corpTour",
        ...options
      })
      .then(async ({ items }) => {
        const landings = items.filter(tour => "fields" in tour);
        resolve(landings);
      });
  });
