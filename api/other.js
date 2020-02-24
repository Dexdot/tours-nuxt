import client from "~/api/client";

export const fetchGeneral = ({ locale, city }) =>
  new Promise((resolve, reject) => {
    client
      .getEntries({
        content_type: "general",
        "fields.city": city,
        locale
      })
      .then(({ items }) => {
        const data = items[0] ? items[0].fields : null;

        if (data) {
          resolve(data);
        } else {
          reject();
        }
      });
  });
