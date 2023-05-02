const contentful = require("contentful");

const space = process.env.NUXT_ENV_SPACE_ID;
const accessToken = process.env.NUXT_ENV_ACCESS_TOKEN;

const client = contentful.createClient({ accessToken, space });

export default client;
