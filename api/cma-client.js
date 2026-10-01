const contentful = require("contentful-management");
const { getContentfulProxyOptions } = require("./contentful-proxy");

const accessToken = process.env.NUXT_ENV_CMA_TOKEN;

const cmaClient = contentful.createClient({
  accessToken,
  ...getContentfulProxyOptions()
});
export default cmaClient;
