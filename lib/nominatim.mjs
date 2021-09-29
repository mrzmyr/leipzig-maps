import fetch from 'node-fetch';

const search_url = `https://nominatim.openstreetmap.org/search?format=json&polygon=1&addressdetails=1`

export const search = async (q) => {
  const response = await fetch(`${search_url}&q=${q}`);
  return await response.json();
}
