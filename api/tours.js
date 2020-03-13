import client from "~/api/client";

// Tours
export const fetchTours = options =>
  new Promise(resolve => {
    client
      .getEntries({
        content_type: "tour",
        ...options
      })
      .then(async ({ items }) => {
        const tours = items.filter(tour => "fields" in tour);
        resolve(tours);
      });
  });
