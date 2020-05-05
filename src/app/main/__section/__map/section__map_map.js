import {
    getStatisticData
} from "../../../common_blocks/scripts/fetchData";

ymaps.ready(init);

function init() {
    var myMap = new ymaps.Map("map", {
        center: [48.678298, 13.919976],
        zoom: 5,
        controls: ['zoomControl'],
    }, {
        suppressMapOpenBlock: true
    });

    myMap.behaviors.disable('scrollZoom'); 

    var clusterer = new ymaps.Clusterer({
        /**
         * Через кластеризатор можно указать только стили кластеров,
         * стили для меток нужно назначать каждой метке отдельно.
         * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/option.presetStorage.xml
         */
        preset: 'islands#invertedVioletClusterIcons',
        /**
         * Ставим true, если хотим кластеризовать только точки с одинаковыми координатами.
         */
        groupByCoordinates: false,
        /**
         * Опции кластеров указываем в кластеризаторе с префиксом "cluster".
         * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/ClusterPlacemark.xml
         */
        clusterDisableClickZoom: true,
        clusterHideIconOnBalloonOpen: false,
        geoObjectHideIconOnBalloonOpen: false,
        clusterIconLayout: ymaps.templateLayoutFactory.createClass('<div class="clusterIcon">{{properties.geoObjects[0].properties._data.name}}</div>'),
        clusterIconShape: {
            type: 'Rectangle',
            coordinates: [[0, 0], [20, 20]]
        }
    });

    var IconContentLayout = ymaps.templateLayoutFactory.createClass(
        '<div class="mark">$[properties.iconContent]</div>'
    );

    var IconContentLayoutHover = ymaps.templateLayoutFactory.createClass(
        '<div class="mark_hover">' +
        '$[properties.balloonHeader]' +
        '</div>'
    );

    var MyBalloonLayout = ymaps.templateLayoutFactory.createClass(
        ' <div class="popover top">' +
        ' <a class="close" href="#"><div class="close"></div></a>' +
        ' <div class="arrow"> </div>' +
        ' <div class="popover-inner">' +
        '$[[options.contentLayout observeSize minWidth=235 maxWidth=1200 maxHeight=350]]' +
        ' </div>' +
        ' </div>');

    // Создание вложенного макета содержимого балуна.
    var MyBalloonContentLayout = ymaps.templateLayoutFactory.createClass(
        '<div class="container text-white">' +
        '<div class="column">$[properties.balloonHeader]</div>' +
        '<div class="column">$[properties.balloonContent] </div>' +
        '</div>'
    );

    let placemarks = [];

    const renderMarks = async () => {
        const data = await new getStatisticData();
        const resData = await data.byTotalCases();
        for (let i = 0; i < 50; i++) {
            let coord = await func(resData[i].country);
            if (coord) {
                var myPlacemarkWithContent = new ymaps.Placemark([coord[1], coord[0]], {
                    iconContent: `${resData[i].cases.total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")}`,
                    balloonHeader: '<div class="placemark_info">' +
                        '<div class="placemark_info-cases">' +
                        `<h2>${resData[i].country}</h2>` +
                        '</div>' +
                        '<div class="placemark_info-cases">' +
                        `<h3>New cases: <span>${resData[i].cases.new ? resData[i].cases.new.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") : 0}</span></h3>` +
                        '</div>' +
                        '<div class="placemark_info-cases">' +
                        `<h3>Critical cases: <span>${resData[i].cases.critical ? resData[i].cases.critical.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") : 0}</span></h3>` +
                        '</div>' +
                        '<div class="placemark_info-cases">' +
                        `<h3>Total cases: <span>${resData[i].cases.total ? resData[i].cases.total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") : 0}</span></h3>` +
                        '</div>' +
                        '<div class="placemark_info-cases">' +
                        `<h3>Recovered: <span>${resData[i].cases.recovered ? resData[i].cases.recovered.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") : 0}</span></h3>` +
                        '</div>' +
                        '<div class="placemark_info-cases">' +
                        `<h3>Deaths: <span>${resData[i].deaths.total ? resData[i].deaths.total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") : 0}</span></h3>` +
                        '</div>' +
                        '</div>',
                    name: `${resData[i].cases.total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")}`
                }, {
                    iconLayout: 'default#imageWithContent',
                    iconImageHref: '',
                    iconImageSize: [65, 65],
                    // Смещение левого верхнего угла иконки относительно
                    // её "ножки" (точки привязки).
                    iconImageOffset: [-50, -45],
                    // Смещение слоя с содержимым относительно слоя с картинкой.
                    iconContentLayout: IconContentLayout,
                });
                let time;
                myPlacemarkWithContent.events
                    .add('click', function (e) {
                        e.get('target').options.set('iconContentLayout', IconContentLayoutHover);
                        e.get('target').options.set('iconImageSize', [220, 250])
                    })
                    .add('mouseenter', function (e) {
                        time = setInterval(() => {
                            e.get('target').options.set('iconContentLayout', IconContentLayoutHover);
                        }, 500)
                        e.get('target').options.set('iconImageSize', [220, 250])
                    })
                    .add('mouseleave', function (e) {
                        clearInterval(time);
                        e.get('target').options.set('iconContentLayout', IconContentLayout);
                        e.get('target').options.set('iconImageSize', [65, 65])
                    });
                placemarks.push(myPlacemarkWithContent);
                myMap.geoObjects.add(myPlacemarkWithContent);
            }
        }
        clusterer.add(placemarks);
    }

    renderMarks();
    clusterer.options.set({
        gridSize: 128,
        clusterDisableClickZoom: true,
    });
    myMap.geoObjects.add(clusterer);

    const func = async (country) => {
        const req = await fetch(`https://geocode-maps.yandex.ru/1.x/?apikey=a712e72d-d189-4c89-a4e8-4e14a748b2c4&format=json&geocode=${country}`);
        const preres = await req.json();
        if (preres.response.GeoObjectCollection.featureMember[0]) {
            const res = preres.response.GeoObjectCollection.featureMember[0].GeoObject.Point.pos;
            return res.split(' ')
        } else {
            return ''
        }
    }
}