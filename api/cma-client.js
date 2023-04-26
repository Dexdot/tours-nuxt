const contentful = require("contentful-management");

const accessToken = process.env.NUXT_ENV_CMA_TOKEN;

const cmaClient = contentful.createClient({ accessToken });
export default cmaClient;
