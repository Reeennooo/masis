document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.table__btn, .table__set-assigment').forEach(function (el) {
        el.addEventListener('click', function (e) {
            e.stopPropagation();
        });
    });

    document.querySelectorAll('.table__toggle').forEach(function (el) {
        el.addEventListener('click', function (e) {
            e.preventDefault();
            let container = el.closest('.table');

            if (container.classList.contains('table--closed')) {
                container.classList.remove('table--closed');
            } else {
                container.classList.add('table--closed');
            }
        });
    });

    document.querySelectorAll('.table__group-toggle').forEach(function (el) {
        el.addEventListener('click', function (e) {
            e.preventDefault();
            let container = el.closest('.table__group');

            if (container.classList.contains('table__group--hidden')) {
                container.classList.remove('table__group--hidden');
            } else {
                container.classList.add('table__group--hidden');
            }
        });
    });
});
