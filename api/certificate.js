import client from "~/api/client";
import { cachedFetch } from "~/api/cache";

export const fetchCertificates = options =>
  cachedFetch(`certificate:${JSON.stringify(options)}`, () =>
    client
      .getEntries({
        content_type: "certificate",
        ...options
      })
      .then(({ items }) => {
        const filtered = items.filter(certPage => "fields" in certPage);
        filtered.sort((a, b) => {
          const aTime = new Date(a.sys.createdAt).getTime();
          const bTime = new Date(b.sys.createdAt).getTime();
          return aTime - bTime;
        });
        return filtered;
      })
  );
