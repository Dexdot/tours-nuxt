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

export const fetchTour = options =>
  new Promise((resolve, reject) => {
    client
      .getEntries({
        content_type: "tour",
        ...options
      })
      .then(({ items }) => {
        const tour = items[0] && "fields" in items[0] ? items[0] : null;

        if (tour) {
          resolve(tour);
        } else {
          reject();
        }
      });
  });
