require('./main.css');

/*global ymaps*/

const container = document.querySelector('#map');
const interactiveMap = require('./js/interactiveMap');
const events = require('./js/events')

//Создаем карту
ymaps.ready(async () => {
  const coords = await interactiveMap.geoLocation();

  ymaps.map = new ymaps.Map(container, {
    center: coords,
    zoom: 12,
    controls: ['zoomControl'],
    behaviors: ['drag'],
  });

  events.click()
});

//Создаем кластеризатор
// const clusterer = new ymaps.Clusterer({
//   groupByCoordinates: true,
//   clusterDisableClickZoom: true,
//   clusterOpenBalloonOnClick: false,
// });
// clusterer.events.add('click', function (e) {
//   const coords = e.get('target').geometry.getCoordinates();
//   this.onClick(coords);
// });

// Обработка события, возникающего при щелчке левой кнопкой мыши в любой точке карты.
// При возникновении такого события откроем балун.
// myMap.events.add('click', function (e) {
//   if (!myMap.balloon.isOpen()) {
//     const coords = e.get('coords');
//     myMap.balloon.open(coords, {
//       contentHeader: 'Отзыв:',
//       contentBody:
//         '<input style = "margin-bottom: 10px;"  type="text" placeholder="Укажите Ваше имя"></input><br><input style = "margin-bottom: 10px;" type="text" placeholder="Укажите место"></input><br><textarea style = "margin-bottom: 13px;" placeholder="Оставьте отзыв"></textarea>',
//       contentFooter: '<button>Добавить</button>',
//     });
//   } else {
//     myMap.balloon.close();
//   }
// });

// // Скрываем хинт при открытии балуна.
// myMap.events.add('balloonopen', function (e) {
//   myMap.hint.close();
// });

// //Плейсмарк
// const placemark = new ymaps.Placemark(coords);
// placemark.events.add('click', (e) => {
//   const coords = e.get('target').geometry.getCoordinates();
//   this.onClick(coords);
// });
// this.clusterer.add(placemark);
