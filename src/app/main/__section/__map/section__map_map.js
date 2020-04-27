import {
    getStatisticData
} from "../../../common_blocks/scripts/fetchData";

ymaps.ready(init);

function init() {
    var myMap = new ymaps.Map("map", {
        center: [48.678298, 13.919976],
        zoom: 5,
        controls: ['zoomControl']
    }, {
        suppressMapOpenBlock: true
    });


    var IconContentLayout = ymaps.templateLayoutFactory.createClass(
        '<div class="mark">$[properties.iconContent]</div>'
    );

    var IconContentLayoutHover = ymaps.templateLayoutFactory.createClass(
        '<div class="mark_hover">' +
        '$[properties.balloonHeader]' +
        '$[properties.balloonContent]' +
        '</div>'
    );

    var MyBalloonLayout = ymaps.templateLayoutFactory.createClass(
            ' <div class="popover top">' +
            ' <a class="close" href="#"><div class="close"></div></a>' +
            ' <div class="arrow"> </div>' +
            ' <div class="popover-inner">' +
            '$[[options.contentLayout observeSize minWidth=235 maxWidth=1200 maxHeight=350]]' +
            ' </div>' +
            ' </div>', {
                /**
                 * Строит экземпляр макета на основе шаблона и добавляет его в родительский HTML-элемент.
                 * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/layout.templateBased.Base.xml#build
                 * @function
                 * @name build
                 */
                build: function () {
                    this.constructor.superclass.build.call(this);
                    this._$element = $('.popover', this.getParentElement());
                    this.applyElementOffset();
                    this._$element.find('.close')
                        .on('click', $.proxy(this.onCloseClick, this));
                },
                /**
                 * Удаляет содержимое макета из DOM.
                 * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/layout.templateBased.Base.xml#clear
                 * @function
                 * @name clear
                 */
                clear: function () {
                    this._$element.find('.close')
                        .off('click');
                    this.constructor.superclass.clear.call(this);
                },

                /**
                 * Метод будет вызван системой шаблонов АПИ при изменении размеров вложенного макета.
                 * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/IBalloonLayout.xml#event-userclose
                 * @function
                 * @name onSublayoutSizeChange
                 */
                onSublayoutSizeChange: function () {
                    MyBalloonLayout.superclass.onSublayoutSizeChange.apply(this, arguments);

                    if (!this._isElement(this._$element)) {
                        return;
                    }
                    this.applyElementOffset();
                    this.events.fire('shapechange');
                },

                /**
                 * Сдвигаем балун, чтобы середина указывала на точку привязки.
                 * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/IBalloonLayout.xml#event-userclose
                 * @function
                 * @name applyElementOffset
                 */
                applyElementOffset: function () {
                    this._$element.css({
                        left: -(this._$element[0].offsetWidth / 2),
                        top: -(this._$element[0].offsetHeight + this._$element.find('.arrow')[0].offsetHeight)
                    });
                },

                /**
                 * Закрывает балун при клике на крестик, кидая событие "userclose" на макете.
                 * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/IBalloonLayout.xml#event-userclose
                 * @function
                 * @name onCloseClick
                 */
                onCloseClick: function (e) {
                    e.preventDefault();
                    this.events.fire('userclose');
                },

                /**
                 * Используется для автопозиционирования (balloonAutoPan).
                 * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/ILayout.xml#getClientBounds
                 * @function
                 * @name getClientBounds
                 * @returns {Number[][]} Координаты левого верхнего и правого нижнего углов шаблона относительно точки привязки.
                 */
                getShape: function () {
                    if (!this._isElement(this._$element)) {
                        return MyBalloonLayout.superclass.getShape.call(this);
                    }
                    var position = this._$element.position();
                    return new ymaps.shape.Rectangle(new ymaps.geometry.pixel.Rectangle([
                        [position.left, position.top],
                        [
                            position.left + this._$element[0].offsetWidth,
                            position.top + this._$element[0].offsetHeight + this._$element.find('.arrow')[0].offsetHeight
                        ]
                    ]));
                },
                /**
                 * Проверяем наличие элемента (в ИЕ и Опере его еще может не быть).
                 * @function
                 * @private
                 * @name _isElement
                 * @param {jQuery} [element] Элемент.
                 * @returns {Boolean} Флаг наличия.
                 */
                _isElement: function (element) {
                    return element && element[0] && element.find('.arrow')[0];
                }
            }),

        // Создание вложенного макета содержимого балуна.
        MyBalloonContentLayout = ymaps.templateLayoutFactory.createClass(
            '<div class="container text-white">' +
            '<div class="column">$[properties.balloonHeader]</div>' +
            '<div class="column">$[properties.balloonContent] </div>' +
            '</div>'
        );


    const renderMarks = async () => {
        const data = await new getStatisticData();
        const resData = await data.byTotalCases();
        for (let i = 0; i < 200; i++) {
            let coord = await func(resData[i].country);
            if (coord) {
                var myPlacemarkWithContent = new ymaps.Placemark([coord[1], coord[0]], {
                    iconContent: `${resData[i].cases.total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")}`,
                    balloonHeader: `${resData[i].country}`,
                    balloonContent: '<div>Hello there</div>'
                }, {
                    iconLayout: 'default#imageWithContent',
                    iconImageHref: '',
                    iconImageSize: [65, 65],
                    // Смещение левого верхнего угла иконки относительно
                    // её "ножки" (точки привязки).
                    iconImageOffset: [-50, -45],
                    // Смещение слоя с содержимым относительно слоя с картинкой.
                    iconContentLayout: IconContentLayout,
                    balloonLayout: MyBalloonLayout,
                    balloonContentLayout: MyBalloonContentLayout,
                    balloonPanelMaxMapArea: 0,
                    balloonOffset: [-50, -50]
                });
                let time;
                myPlacemarkWithContent.events
                    .add('mouseenter', function (e) {
                        time = setInterval(() => {
                            e.get('target').options.set('iconContentLayout', IconContentLayoutHover);
                        }, 700)
                    })
                    .add('mouseleave', function (e) {
                        clearInterval(time);
                        e.get('target').options.set('iconContentLayout', IconContentLayout);
                    });
                myMap.geoObjects.add(myPlacemarkWithContent);
            }
        }
    }


    renderMarks();

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