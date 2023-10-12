let mainMap;
let objectManager;

ymaps.ready(init);

function init() {
    mainMap = new ymaps.Map(
        'yandex-map',
        {
            center: [44.582156, 38.06128],
            zoom: 13,
            controls: [],
        },
        { suppressMapOpenBlock: true, autoFitToViewport: 'always' }
    );

    mainMap.controls.add('zoomControl', {
        size: 'small',
        float: 'none',
        position: {
            top: '24px',
            left: '24px',
        },
    });

    // Создайм собственный макет ХИНТА
    const HINT_TEMPLATE = ymaps.templateLayoutFactory.createClass(
        `<div class='hint'>
        <div class='hint__top'>
        <span class='hint__number'>{{properties.hintNumber}}</span>
        <span class='hint__problem'>{{properties.hintProblem}}</span>
        </div>
        <span class='hint__address'>{{properties.hintAddress}}</span>
        <span class='hint__phone'>{{properties.hintPhone}}</span>
        </div>`,
        {
            getShape: function () {
                var el = this.getElement(),
                    result = null;
                if (el) {
                    var firstChild = el.firstChild;
                    result = new ymaps.shape.Rectangle(
                        new ymaps.geometry.pixel.Rectangle([
                            [0, 0],
                            [firstChild.offsetWidth, firstChild.offsetHeight],
                        ])
                    );
                }
                return result;
            },
        }
    );

    // Создайм собственный макет КЛАСТЕРА
    let clusterIcons = [
        {
            href: 'img/map/map-marker-bg.svg',
            size: [51, 72],
            offset: [0, 0],
        },
    ];
    MyIconContentLayout = ymaps.templateLayoutFactory.createClass("<div class='cluster'>{{ properties.geoObjects.length }}</div>");

    // ТОЧКИ НА КАРТЕ
    const POINTS = [
        {
            type: 'request',
            coordinate: [44.582023, 38.05834],
            addres: 'Заявка из EDA',
            data: {
                hintNumber: '#22',
                hintAddress: 'Улица Пушкина, 12',
                hintPhone: '+7 (999) 123-45-67',
                hintProblem: 'Течь на земле',
            },
        },
        {
            type: 'application',
            coordinate: [44.585013, 38.066296],
            addres: 'Парк имени Адмирала',
            data: {
                hintNumber: '#23',
                hintAddress: 'Улица Адмирала, 111 Улица Адмирала, 111 Улица Адмирала, 111',
                hintPhone: '+7 (999) 123-45-67',
                hintProblem: 'Воздушная буря Воздушная буря',
            },
        },
        {
            type: 'request',
            coordinate: [44.573679, 38.081105],
            addres: 'Заявка из EDA',
            data: {
                hintNumber: '#22',
                hintAddress: 'Пушкин',
                hintPhone: '+7 (999) 123-45-67',
                hintProblem: 'Течь на земле',
            },
        },
        {
            type: 'request',
            coordinate: [44.571791, 38.079498],
            addres: 'Заявка из EDA',
            data: {
                hintNumber: '#22',
                hintAddress: 'Пушкин2',
                hintPhone: '+7 (999) 123-45-67',
                hintProblem: 'Течь на земле',
            },
        },
    ];

    // objectManager для управления точками
    objectManager = new ymaps.ObjectManager({
        clusterize: true,
        clusterIconContentLayout: MyIconContentLayout,
        clusterIcons: clusterIcons,
    });
    let currentID = 0;
    function createRequestPoint(coordinate, type, data) {
        const RequestPoint = {
            type: 'Feature',
            id: currentID++,
            geometry: {
                type: 'Point',
                coordinates: coordinate,
            },
            properties: {
                // hintContent: 'Содержание всплывающей подсказки',
                // balloonContent: 'Содержание балуна',
                type: type,
                hintNumber: data.hintNumber,
                hintAddress: data.hintAddress,
                hintPhone: data.hintPhone,
                hintProblem: data.hintProblem,
            },
            options: {
                iconLayout: 'default#image',
                iconImageHref: './img/map/map-marker-appeal.svg',
                iconImageSize: [72, 100],
                iconImageOffset: [-36, -50],
                hintLayout: HINT_TEMPLATE,
            },
        };
        return RequestPoint;
    }

    function createApplicationPoint(coordinate, type, data) {
        const ApplicationPoint = {
            type: 'Feature',
            id: currentID++,
            geometry: {
                type: 'Point',
                coordinates: coordinate,
            },
            properties: {
                type: type,
                hintNumber: data.hintNumber,
                hintAddress: data.hintAddress,
                hintPhone: data.hintPhone,
                hintProblem: data.hintProblem,
            },
            options: {
                iconLayout: 'default#image',
                iconImageHref: './img/map/map-marker-application.svg',
                iconImageSize: [72, 100],
                iconImageOffset: [-36, -50],
                hintLayout: HINT_TEMPLATE,
            },
        };
        // ApplicationPoint.events.add('click', () => openModal('modal-application'));
        return ApplicationPoint;
    }

    // Добавление объектов на карту
    POINTS.map((point) => {
        switch (point.type) {
            case 'request':
                objectManager.add(createRequestPoint(point.coordinate, point.type, point.data));
                // mainMap.geoObjects.add(createRequestPoint(point.coordinate, point.data));
                break;
            case 'application':
                objectManager.add(createApplicationPoint(point.coordinate, point.type, point.data));
                break;
            default:
                console.log('Something went wrong');
        }
    });

    // ДОБАВЛЯЮ OBJECT MANAGER НА КАРТУ.
    mainMap.geoObjects.add(objectManager);
    objectManager.objects.events.add(['click'], () => openModal('modal-appeal'));
    // console.log(objectManager.objects.getAll());

    // СОЗДАНИЕ СЛОЁВ
    // var MQLayer = function () {
    //     var layer = new ymaps.Layer('http://oatile%d.mqcdn.com/naip//%z/%x/%y.jpg');
    //     // Копирайты
    //     layer.getCopyrights = function () {
    //         return ymaps.vow.resolve('Данный, изображения и информация о карте предоставлены MapQuest, Open Street Mapи контрибьютерами, CC-BY-SA');
    //     };
    //     // Доступные уровни зума
    //     layer.getZoomRange = function () {
    //         return ymaps.vow.resolve([0, 18]);
    //     };
    
    //     return layer;
    // };

    // ЭЛЕМЕНТ УПРАВЛЕНИЯ СЛОИ

    mainMap.controls.add('typeSelector', {
        panoramasItemMode: 'off',
        float: 'none',
        position: {
            left: '24px',
            top: '136px',
        },
        mapTypes: ['Водоснабжение', 'ОРС', "Водоотведение"]
    });
    // const typeSelector = mainMap.controls.get('typeSelector');
    // console.log(typeSelector.state.get('size'));
    // typeSelector.removeAllMapTypes();
}

// ФИЛЬТРАЦИЯ ТОЧЕК НА КАРТЕ
const mapFilter = document.querySelector('.map-filter');
const buttons = mapFilter.querySelectorAll('button');
function filterClick(event) {
    if (event.target.classList.contains('is-active')) return;
    buttons.forEach((el) => el.classList.remove('is-active'));
    event.target.classList.add('is-active');

    if (event.target.classList.contains('map-filter__all')) {
        objectManager.setFilter(null);
        return;
    }

    if (event.target.classList.contains('map-filter__request')) {
        objectManager.setFilter("properties.type == 'request'");
        return;
    }

    if (event.target.classList.contains('map-filter__application')) {
        objectManager.setFilter("properties.type == 'application'");
        return;
    }
}
mapFilter.addEventListener('click', (event) => filterClick(event));
