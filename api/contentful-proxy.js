const HttpsProxyAgent = require("https-proxy-agent");

const proxyUrl = process.env.CONTENTFUL_HTTP_PROXY;

function getContentfulProxyOptions() {
  if (!proxyUrl) {
    return {};
  }

  const agent = new HttpsProxyAgent(proxyUrl);
  return { httpAgent: agent, httpsAgent: agent };
}

module.exports = { getContentfulProxyOptions };
