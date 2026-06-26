import client from "~/api/client";
import { cachedFetch } from "~/api/cache";

export const fetchGeneral = ({ locale, city }) =>
  cachedFetch(`general:${city}:${locale}`, () =>
    client
      .getEntries({
        content_type: "general",
        "fields.city": city,
        locale
      })
      .then(({ items }) => {
        const data = items[0] ? items[0].fields : null;

        if (data) {
          return data;
        }
        throw new Error(`No general data for city=${city}, locale=${locale}`);
      })
  );

export const fetchMain = ({ locale, city }) =>
  cachedFetch(`main:${city}:${locale}`, () =>
    client
      .getEntries({
        content_type: "main",
        "fields.city": city,
        locale
      })
      .then(({ items }) => {
        const data = items[0] ? items[0].fields : null;

        if (data) {
          return data;
        }
        throw new Error(`No main data for city=${city}, locale=${locale}`);
      })
  );
