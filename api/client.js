const contentful = require("contentful");

// Get keys
const space = process.env.NUXT_ENV_SPACE_ID;
const accessToken = process.env.NUXT_ENV_ACCESS_TOKEN;

// Client instance
const client = contentful.createClient({ accessToken, space });

export default client;
