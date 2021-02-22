import client from "~/api/client";

// Certificate pages
export const fetchCertificates = options =>
  new Promise(resolve => {
    client
      .getEntries({
        content_type: "certificate",
        ...options
      })
      .then(async ({ items }) => {
        const certPages = items.filter(certPage => "fields" in certPage);
        resolve(certPages);
      });
  });
