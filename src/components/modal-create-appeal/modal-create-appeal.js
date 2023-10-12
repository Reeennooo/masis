document.addEventListener('DOMContentLoaded', () => {
    const interconnectedItem = document.querySelector('.appeal-interconnected');
    if (interconnectedItem) {
        const input = interconnectedItem.querySelector('input');
        const interconnectedBlock = interconnectedItem.querySelector('.modal-create-appeal__result-interconnected');
        function showResultBlock() {
            if (input.value.length) {
                interconnectedBlock.classList.add('is-active');
            }
        }
        input.addEventListener('input', showResultBlock);
    }

    // let observer = new MutationObserver((MutationRecords) => console.log(MutationRecords));
    // observer.observe(interconnectedItem, { attributes: true, subtree: true, attributeFilter: ['value'] });
});

export function createInterconnectedElement(select, input) {
    const infoItem = select.closest('.modal-info__item');
    const searchWp = infoItem?.querySelector('.i-select__search-input-wp');
    if (infoItem && infoItem.classList.contains('appeal-interconnected')) {
        select.style.display = 'none';
        const interconnectedWrapper = infoItem.querySelector('.result-interconnected');
        const interconnectedElement = document.createElement('div');
        interconnectedWrapper.classList.add('is-active');
        interconnectedElement.classList.add('modal-create-appeal__interconnected-el');
        interconnectedElement.innerHTML = `<a href='#'>${input.value}</a>`;
        interconnectedElement.insertAdjacentHTML('beforeend', '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.05033 16.9497L16.9498 7.05025M16.9498 16.9497L7.05033 7.05025" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>');
        interconnectedElement.querySelector('svg').addEventListener('click', () => {
            input.value = '';
            interconnectedWrapper.classList.remove('is-active');
            interconnectedWrapper.innerHTML = '';
            select.style = '';
            searchWp.style = '';
        });
        interconnectedWrapper.append(interconnectedElement);
    }
}

export function createOptions(select, selectItem) {
    const infoItem = select.closest('.modal-info__item');
    if (infoItem) {
        let optionsWrapper = infoItem.querySelector('.modal-info__options-wrapper');
        let data = JSON.parse(selectItem.dataset.categories);
        optionsWrapper.innerHTML = '';
        data.forEach((selectItem) => {
            const label = document.createElement('label');
            label.setAttribute('for', `${selectItem.id}`);
            label.classList.add('option');
            label.innerHTML = `<span>${selectItem.txt}</span>`;
            const input = document.createElement('input');

            input.setAttribute('type', 'radio');
            input.setAttribute('name', `${selectItem.name}`);
            input.setAttribute('id', `${selectItem.id}`);
            input.setAttribute('value', `${selectItem.id}`);
            input.checked = selectItem.checked;
            label.prepend(input);
            optionsWrapper.append(label);
        });
        optionsWrapper.classList.remove('hidden');
    }
}
