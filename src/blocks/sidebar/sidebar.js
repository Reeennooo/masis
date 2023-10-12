import { debounce } from '../../js/global-scripts';

document.addEventListener('DOMContentLoaded', () => {
    const wrapper = document.querySelector('.wrapper');
    const sidebar = document.querySelector('.sidebar');
    const toggleBtn = sidebar.querySelector('.sidebar__toggle');

    // Открытие/Скрытие sidebar
    function toggleSideBar() {
        sidebar.classList.toggle('collapsed');
        if (sidebar.classList.contains('collapsed')) {
            wrapper.classList.add('sidebar-collapsed');
        } else {
            wrapper.classList.remove('sidebar-collapsed');
        }
    }
    toggleBtn.addEventListener('click', toggleSideBar);

    function changeSizeDesktop() {
        if (window.innerWidth < 991) {
            sidebar.classList.add('collapsed');
            wrapper.classList.add('sidebar-collapsed');
        } else {
            wrapper.classList.remove('sidebar-collapsed');
            sidebar.classList.remove('collapsed');
        }
        sidebar.style.display = 'block';
    }

    changeSizeDesktop();
    window.addEventListener('resize', debounce(changeSizeDesktop, 300));

    // Выбор активного пункта
    const navElements = sidebar.querySelectorAll('.sidebar__navigation-el');

    const setActiveEl = (arr) => {
        if (window.location.pathname === '/') {
            const el = [...arr].find((el) => el.id === '/');
            el.classList.add('is-active');
            return;
        }
        arr.forEach((el) => {
            if (window.location.pathname.includes(el.id) && el.id && el.id !== '/') {
                el.classList.add('is-active');
            }
        });
    };
    setActiveEl(navElements);

    function changeActiveEl(el, arr) {
        if (el.classList.contains('is-active')) return;
        arr.forEach((el) => el.classList.remove('is-active'));
        el.classList.add('is-active');
    }

    navElements.forEach((el, i, arr) => el.addEventListener('click', () => changeActiveEl(el, arr)));
});
