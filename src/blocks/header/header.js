document.addEventListener('DOMContentLoaded', () => {
    const btn = document.querySelector('.header__menu-btn');
    const wrapper = document.querySelector('.wrapper');
    const sidebar = document.querySelector('.sidebar');
    const header = document.querySelector('.header');
    let main = document.querySelector('main');
    // padding for <main>
    // function setPaddingForMain() {
    //     let indent = window.innerWidth < 575 ? 24 : 36;
    //     main.style.paddingTop = header.offsetHeight + indent + 'px';
    // }
    // setPaddingForMain();
    // window.addEventListener('resize', setPaddingForMain);

    const mobileMedia = window.matchMedia('(max-width: 767px)');
    function removeButtonsBlock(event) {
        if (event.matches && window.location.pathname.includes('tasks')) {
            header.querySelector('.header__panel-buttons').remove();
        }
    }

    removeButtonsBlock(mobileMedia);

    mobileMedia.addEventListener('change', (event) => {
        if (event.matches && window.location.pathname.includes('tasks')) {
            header.querySelector('.header__panel-buttons').remove();
        }
    });

    function openSideBar() {
        sidebar.classList.toggle('collapsed');
        if (sidebar.classList.contains('collapsed')) {
            wrapper.classList.add('sidebar-collapsed');
        } else {
            wrapper.classList.remove('sidebar-collapsed');
        }
    }
    btn.addEventListener('click', openSideBar);

    document.querySelectorAll('.header__view-btn').forEach(function (el) {
        el.addEventListener('click', function () {
            let id = el.getAttribute('data-id');
            document.querySelectorAll('.header__view-btn').forEach(function (e) {
                e.classList.remove('header__view-btn--active');
            });
            el.classList.add('header__view-btn--active');

            let tableContainer = document.querySelector('.tables-container');

            if (id == 1) {
                tableContainer.classList.add('tables-container--tile');
            } else {
                tableContainer.classList.remove('tables-container--tile');
            }
        });
    });
});
