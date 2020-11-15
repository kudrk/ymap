const api = require('./api.js');

/*global ymaps*/


const placemarkIcon = {
  iconLayout: "default#image",
  iconImageHref: "img/marker.png",
  iconImageSize: [22, 33],
  iconImageOffset: [-11, -33],

};

//Запускаем карту
function map(coords, container) {
  container.innerHTML = "";

  ymaps.map = new ymaps.Map(container, {
    center: coords,
    zoom: 12,
    controls: ['zoomControl'],
    behaviors: ['drag']
  });
}


async function geoLocation() {
  const result = await ymaps.geolocation.get({ provider: 'auto' });
  return result.geoObjects.position;
}

//Создаем кластеризатор
function clusterer() {
  ymaps.clusterer = new ymaps.Clusterer({
    clusterDisableClickZoom: true,
    clusterOpenBalloonOnClick: false,
    clusterBalloonContentLayout: 'cluster#BalloonCarousel',
    clusterBalloonItemContentLayout: 'my#clasterItemLayout',
  });
  ymaps.map.geoObjects.add(ymaps.clusterer);
}

async function openBalloon(coords) {
  ymaps.map.balloon.open(coords, 'Загрузка', { closeButton: false });

  const comments = await api.getPlacmark(coords);
  const adress = await geoCoder(coords);
  const data = {
    adress,
    coords,
    comments
  };

  ymaps.map.balloon.open(coords, data, { layout: 'my#customBalloonLayout' });
}

//Создаем плейсмарк
function createPlacemarks(placemarks = {}) {
  for (let placemark in placemarks) {
    const coords = placemark.split(",");
    const data = placemarks[placemark];

    ymaps.clusterer.add(new ymaps.Placemark(coords, data, placemarkIcon))
  }
}

//Геокодер
async function geoCoder(coords) {
  const geocoder = await new ymaps.geocode(coords, { results: 1 });
  return geocoder.geoObjects.get(0).properties.get('name');
}

async function openClusterer(target) {
  const coords = target.geometry.getCoordinates();

  ymaps.map.balloon.open(coords, 'Загрузка...', { closeButton: false });

  const geoObjects = target.getGeoObjects();

  for (const geoObject of geoObjects) {
    const coords = geoObject.geometry.getCoordinates();
    const comments = await api.getPlacmark(coords);
    const address = await geoCoder(coords);

    geoObject.properties.set("comments", comments).set("address", address).set("coords", coords);
  }

  ymaps.map.balloon.close(coords);
  ymaps.clusterer.balloon.open(target);
}

module.exports = {
  map,
  geoCoder,
  clusterer,
  geoLocation,
  openBalloon,
  openClusterer,
  createPlacemarks
}