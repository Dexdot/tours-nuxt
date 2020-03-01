import client from "~/api/client";

// Reviews
export const fetchReviews = options =>
  new Promise(resolve => {
    client
      .getEntries({
        content_type: "review",
        ...options
      })
      .then(async ({ items }) => {
        const reviews = items.filter(review => "fields" in review);
        resolve(reviews);
      });
  });
