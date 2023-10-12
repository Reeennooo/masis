document.addEventListener('DOMContentLoaded', () => {
    const functionalLine = document.querySelector('.functional-line');
    let search = document.querySelector('.search');
    let searchInput = search.querySelector('input');
    let clearBtn = search.querySelector('.search__clear');
    let ruller = search.querySelector('.search__ruller');
    let noResults = document.querySelector('.no-results');
    let tables = document.querySelector('.tables-container');

    searchInput.addEventListener('input', () => {
        if (searchInput.value.length) {
            ruller.innerHTML = searchInput.value.replace(/\s/g, '.');
            clearBtn.style.display = 'flex';
            let paddingLeftValue = window.getComputedStyle(searchInput, null).getPropertyValue('padding-left').replace('px', '');
            clearBtn.style.left = Number(paddingLeftValue) + ruller.offsetWidth + 10 + 'px';
            // Активное состояние у functioanal-line
            functionalLine.classList.add('is-active');
            // Ничего не нашлось
            noResults.style.display = 'block';
            tables.style.display = 'none';
        } else {
            // Активное состояние у functioanal-line
            functionalLine.classList.remove('is-active');
            clearBtn.style.display = 'none';
            // Отображаем таблицы снова
            noResults.style.display = 'none';
            tables.style.display = '';
        }
    });
    clearBtn.addEventListener('click', () => {
        searchInput.value = '';
        clearBtn.style.display = 'none';
        // Активное состояние у functioanal-line
        functionalLine.classList.remove('is-active');
        // Отображаем таблицы снова
        noResults.style.display = 'none';
        tables.style.display = '';
    });
});
