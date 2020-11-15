const database = {
  "59.856967, 30.402316": [
    { name: "Сергей", place: "Кафе", text: "Очень вкусно" },
    { name: "Антон", place: "Кафе", text: "Не о чем" }
  ],
};

localStorage.setItem('placemarks', JSON.stringify(database));

const delay = 500;

function _toString(coords) {
  if (Array.isArray(coords)) {
    coords = coords.join(",");
  }

  return coords;
}

function getPlacmarks() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(JSON.parse(localStorage.getItem('placemarks')));
    }, delay)
  });
}

async function getPlacmark(coords) {
  coords = _toString(coords);

  const placemarks = JSON.parse(localStorage.getItem('placemarks'));
  const placemark = placemarks[coords] ? placemarks[coords] : null;

  return new Promise(resolve => {
    setTimeout(() => {
      resolve(placemark)
    }, delay)
  });
}

async function setPlacmark(coords, payload) {
  coords = _toString(coords);

  const placemarks = JSON.parse(localStorage.getItem('placemarks'));
  let status = false;

  if (placemarks[coords]) {
    placemarks[coords].push(payload);
  } else {
    placemarks[coords] = [payload];
    status = true;
  }

  return new Promise(resolve => {
    setTimeout(() => {
      localStorage.setItem('placemarks', JSON.stringify(placemarks));
      resolve(status ? { [coords]: placemarks[coords] } : null);
    }, delay)
  });
}

module.exports = {
  getPlacmarks,
  getPlacmark,
  setPlacmark
}