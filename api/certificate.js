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
        const temp = [...items];
        const filtered = temp.filter(certPage => "fields" in certPage);
        filtered.sort((a, b) => {
          const aTime = new Date(a.sys.createdAt).getTime();
          const bTime = new Date(b.sys.createdAt).getTime();
          return aTime - bTime;
        });
        resolve(filtered);
      });
  });
