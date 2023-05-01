import { nanoid } from "nanoid";

import client from "~/api/client";
import cmaClient from "~/api/cma-client";

const spaceId = process.env.NUXT_ENV_SPACE_ID;

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
        skip += limit;
      })
      .catch(err => {});
  });

export function createReviewEntry(form) {
  return new Promise((resolve, reject) => {
    cmaClient
      .getSpace(spaceId)
      .then(space => space.getEnvironment("master"))
      .then(environment =>
        environment.createEntryWithId("review", nanoid(), {
          fields: {
            locale: {
              "ru-RU": form.locale
            },
            city: {
              "ru-RU": form.city
            },
            date: {
              "ru-RU": form.date
            },
            sortDate: {
              "ru-RU": form.sortDate
            },
            numberOfStars: {
              "ru-RU": form.score
            },
            clientName: {
              "ru-RU": form.clientName
            },
            clientEmail: {
              "ru-RU": form.clientEmail
            },
            tours: {
              "ru-RU": form.tours
            },
            reviewText: {
              "ru-RU": {
                nodeType: "document",
                data: {},
                content: [
                  {
                    data: {},
                    nodeType: "paragraph",
                    content: [
                      {
                        nodeType: "text",
                        value: form.text,
                        data: {},
                        marks: []
                      }
                    ]
                  }
                ]
              }
            }
          }
        })
      )
      .then(entry => {
        resolve(entry);
      })
      .catch(console.error);
  });
}
