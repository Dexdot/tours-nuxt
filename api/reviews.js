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

export const createReviewEntry = () => {
  new Promise(resolve => {
    cmaClient
      .getSpace(spaceId)
      .then(space => space.getEnvironment("master"))
      .then(environment =>
        environment.createEntryWithId("review", nanoid(), {
          fields: {
            locale: {
              "ru-RU": "ru"
            },
            city: {
              "ru-RU": "spb"
            },
            date: {
              "ru-RU": "03.08.1999"
            },
            clientName: {
              "ru-RU": "createEntryTestName"
            },
            name: {
              "ru-RU": "createEntryTest"
            },
            makeIndividual: {
              "ru-RU": false
            },
            numberOfStars: {
              "ru-RU": 3
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
                        value: "some cool text",
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
      .then(entry => console.log(entry))
      .catch(console.error);
  });
};
