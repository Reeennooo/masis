// Изменение размера карты.
let resizeBtns = document.querySelectorAll('.map-resize-btn');
function resizeMap(childButton) {
    let mapInModal = childButton.closest('.modal-location');
    mapInModal.classList.toggle('is-open');
}
if (resizeBtns) {
    resizeBtns.forEach((button) => {
        button.addEventListener('click', () => resizeMap(button));
    });
}

// Карты внутри модалок и тултипов
let newAppealMap;
let newApplication;
let modalMap;
let newDispatcherMap;
let emergencyMap;

ymaps.ready(modalMapInit);
ymaps.ready(newAppealMapInit);
ymaps.ready(newApplicationMapInit);
ymaps.ready(newApplicationDispatcher);
ymaps.ready(newEmergencyMap);

// КАРТА В МОДАЛЬНОМ ОКНЕ
function modalMapInit() {
    modalMap = new ymaps.Map(
        'map-id2312',
        {
            center: [44.582156, 38.06128],
            zoom: 13,
            controls: [],
        },
        { suppressMapOpenBlock: true, autoFitToViewport: 'always' }
    );
}

// КАРТА - СОЗДАНИЕ ЗАЯВКИ
function newAppealMapInit() {
    newAppealMap = new ymaps.Map(
        'map-id051211',
        {
            center: [44.582156, 38.06128],
            zoom: 13,
            controls: [],
        },
        { suppressMapOpenBlock: true, autoFitToViewport: 'always' }
    );
}

function newApplicationMapInit() {
    newAppealMap = new ymaps.Map(
        'map-id0535611',
        {
            center: [44.582156, 38.06128],
            zoom: 13,
            controls: [],
        },
        { suppressMapOpenBlock: true, autoFitToViewport: 'always' }
    );
}

function newApplicationDispatcher() {
    newDispatcherMap = new ymaps.Map(
        'map-id07775611',
        {
            center: [44.582156, 38.06128],
            zoom: 13,
            controls: [],
        },
        { suppressMapOpenBlock: true, autoFitToViewport: 'always' }
    );
}

// КАРТА - НОВЫЙ АВАРИЙНЫЙ ЭЛЕМЕНТ
function newEmergencyMap() {
    emergencyMap = new ymaps.Map(
        'map-09876',
        {
            center: [44.582156, 38.06128],
            zoom: 13,
            controls: [],
        },
        { suppressMapOpenBlock: true, autoFitToViewport: 'always' }
    );
    emergencyMap.controls.add('typeSelector', {
        panoramasItemMode: 'off',
        float: 'none',
        position: {
            bottom: '24px',
            right: '24px',
        },
        // adjustMapMargin: true,
    });
    emergencyMap.controls.add('zoomControl', {
        size: 'small',
        float: 'none',
        position: {
            bottom: '88px',
            right: '24px',
        },
    });
}
