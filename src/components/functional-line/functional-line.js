document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.functional-line__toggler').forEach((button) => {
        button.addEventListener('click', () => {
            button.classList.toggle('is-active');
        });
    });

    const filterOptions = document.querySelector('.list-filter-options');
    const options = document.querySelector('.list-options');

    if (filterOptions || options) {
        document.addEventListener('click', (e) => {
            if (e.target.closest('[data-list]')) {
                // закрытие при открытии другого списка
                filterOptions?.classList.remove('is-active');
                options?.classList.remove('is-active');
                const listName = e.target.closest('[data-list]').dataset.list;
                const list = document.querySelector(`.${listName}`);
                if (list && list.classList.contains('is-active')) {
                    list.classList.remove('is-active');
                } else if (list) {
                    list.classList.add('is-active');
                }
            }
            // закрытие при клике в другую точку
            else if (!e.target.closest('[data-list]') && !e.target.closest('.list-filter-options') && !e.target.closest('.list-options')) {
                filterOptions?.classList.remove('is-active');
                options?.classList.remove('is-active');
            }
        });
    }
});
