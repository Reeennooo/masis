export function createApplicationInterconnected(select) {
    const infoItem = select.closest('.modal-info__item');
    const input = select.querySelector('.i-select__input');

    if (infoItem && infoItem.classList.contains('application-interconnected')) {
        const interconnectedWrapper = infoItem.querySelector('.result-interconnected');
        const allItems = select.querySelectorAll('.i-select__item.is-active');
        interconnectedWrapper.innerHTML = '';
        allItems.forEach((item) => {
            const itemNumber = item.querySelector('.list-item__number').innerHTML;
            const itemTxt = item.querySelector('.list-item__txt').innerHTML;
            const resultStringItem = itemNumber + ' ' + itemTxt;
            const interconnectedElement = document.createElement('div');
            interconnectedWrapper.classList.add('is-active');
            interconnectedElement.classList.add('modal-create-appeal__interconnected-el');
            interconnectedElement.innerHTML = `<a href='#'>${resultStringItem}</a>`;
            interconnectedElement.insertAdjacentHTML('beforeend', '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.05033 16.9497L16.9498 7.05025M16.9498 16.9497L7.05033 7.05025" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>');
            interconnectedWrapper.append(interconnectedElement);

            interconnectedElement.querySelector('svg').addEventListener('click', () => {
                item.classList.remove('is-active');
                item.querySelector("input[type='checkbox']").checked = false;

                input.value = input.value.replace(resultStringItem, '');
                interconnectedElement.remove();
                if (interconnectedWrapper.innerHTML === '') {
                    interconnectedWrapper.classList.remove('is-active');
                    select.style = '';
                    input.value = '';
                    if (!input.value) select.classList.remove('is-selected');
                }
            });
        });
    }
}
