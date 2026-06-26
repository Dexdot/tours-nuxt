const cache = new Map();
const inFlight = new Map();
const DEFAULT_TTL = 60 * 60 * 1000; // 60 min

export function cachedFetch(key, fetcher, ttl = DEFAULT_TTL) {
  const entry = cache.get(key);
  if (entry && Date.now() - entry.time < ttl) {
    return Promise.resolve(entry.data);
  }

  if (inFlight.has(key)) {
    return inFlight.get(key);
  }

  const promise = fetcher()
    .then(data => {
      cache.set(key, { data, time: Date.now() });
      inFlight.delete(key);
      return data;
    })
    .catch(err => {
      inFlight.delete(key);
      throw err;
    });

  inFlight.set(key, promise);
  return promise;
}
