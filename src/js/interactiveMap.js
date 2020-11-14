/*global ymaps*/

async function geoLocation() {
  const result = await ymaps.geolocation.get({ provider: 'auto' });
  return result.geoObjects.position;
}

module.exports = {
  geoLocation,
};
