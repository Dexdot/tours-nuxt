import client from "~/api/client";

// Info pages
export const fetchInfoPages = options =>
  new Promise(resolve => {
    client
      .getEntries({
        content_type: "info",
        ...options
      })
      .then(async ({ items }) => {
        const infoPages = items.filter(infoPage => "fields" in infoPage);
        resolve(infoPages);
      });
  });
