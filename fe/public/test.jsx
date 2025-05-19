const cache = {};
async function getData(url) {
  if (cache[url]) {
    return cache[url];
  }
  const response = await fetch(url);
  const data = await response.json();
  cache[url] = data;
  return data;
}
