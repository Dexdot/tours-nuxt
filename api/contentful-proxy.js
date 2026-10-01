const proxyUrl = process.env.CONTENTFUL_HTTP_PROXY;

function getContentfulProxyOptions() {
  if (!process.server || !proxyUrl) {
    return {};
  }

  // eslint-disable-next-line global-require
  const HttpsProxyAgent = require("https-proxy-agent");
  const agent = new HttpsProxyAgent(proxyUrl);
  return { httpAgent: agent, httpsAgent: agent };
}

module.exports = { getContentfulProxyOptions };
