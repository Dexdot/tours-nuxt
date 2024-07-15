import client from "~/api/client";

// Corp tours
export const fetchCorpTours = options =>
  new Promise(resolve => {
    client
      .getEntries({
        content_type: "corpTour",
        ...options
      })
      .then(async ({ items }) => {
        const tours = items.filter(tour => "fields" in tour);
        resolve(tours);
      });
  });
