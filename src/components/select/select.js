import { createInterconnectedElement, createOptions } from '../modal-create-appeal/modal-create-appeal';
import { createApplicationInterconnected } from '../modal-create-application/modal-create-application';

document.addEventListener('DOMContentLoaded', () => {
    const selects = document.querySelectorAll('.i-select');

    if (selects.length) {
        document.addEventListener('click', (event) => handleClick(event));
        // Нажатие на элемент из выпадающего списка.
        selects.forEach((select) => {
            const clearBtn = select.querySelector('.i-select__input-clear');
            if (clearBtn) clearBtn.addEventListener('click', () => clearInput(select));
            select.addEventListener('click', (event) => {
                const selectItem = event.target.closest('.i-select__item');
                const checkbox = event.target.closest('.custom-checkbox');

                if (checkbox) {
                    event.preventDefault();
                }

                if (selectItem) {
                    chooseItem(select, selectItem);
                }
            });

            const clearBtnSecond = select.querySelector('.i-select__clear');
            if (clearBtnSecond) {
                clearBtnSecond.addEventListener('click', () => {
                    let selected = select.querySelector('.i-select__selected');
                    selected.innerHTML = selected.dataset.placeholder;
                    select.querySelector('.i-select__input').value = '';
                    select.classList.remove('is-selected');
                });
            }
        });
        // Очистить выбор
    }

    function clearInput(select) {
        const input = select.querySelector('.i-select__search-input');
        input.value = '';
    }

    function openSelect(select) {
        if (select.classList.contains('is-active')) return;
        selects.forEach((select) => select.classList.remove('is-active'));
        select.classList.add('is-active');

        // input
        const input = select.querySelector('.i-select__search-input');
        if (input) {
            // input.focus();
            input.selectionStart = input.value.length;
            if (select.classList.contains('i-select--city')) {
                input.placeholder = 'Выберите заявку или найдите по адресу / номеру';
            }
        }
    }

    function closeSelect(select) {
        if (!select.classList.contains('is-active')) return;
        select.classList.remove('is-active');
        // input
        const inputWrapper = select.querySelector('.i-select__search-input-wp');
        const input = select.querySelector('.i-select__input');

        if (input) {
            input.blur();
            if (select.classList.contains('i-select--city')) {
                input.placeholder = 'Выберите заявку';
            }
        }
        if (inputWrapper) {
            inputWrapper.style = '';
        }

        // application-interconnected
        createApplicationInterconnected(select);
    }

    function chooseItem(select, item) {
        const allItems = select.querySelectorAll('.i-select__item');
        const input = select.querySelector('.i-select__input');
        // MULTIPLY CHOICE
        if (select.classList.contains('multiply-choice')) {
            const checkbox = item.querySelector("input[type='checkbox']");

            if (item.classList.contains('is-active')) {
                item.classList.remove('is-active');
                checkbox.checked = false;
                let regex = new RegExp(`(${item.dataset.value + ','}|${item.dataset.value})`);
                input.value = input.value.replace(regex, '');
            } else {
                input.value = input.value.length ? input.value + ', ' + item.dataset.value : item.dataset.value;
                item.classList.add('is-active');
                checkbox.checked = true;
            }
        }
        // SINGLE CHOICE
        else {
            allItems.forEach((el) => el.classList.remove('is-active'));
            input.value = item.dataset.value;
            item.classList.add('is-active');
        }

        if (input.value) {
            select.classList.add('is-selected');
        } else {
            select.classList.remove('is-selected');
        }

        // without input
        const selectedTxt = select.querySelector('.i-select__selected');
        if (selectedTxt) {
            selectedTxt.innerHTML = item.dataset.value;
        }

        // ADDRESS SELECT
        if (select.classList.contains('address')) {
            const addressListItem = item.querySelector('.list-item--address');
            const streetTxt = addressListItem.querySelector('.list-item__txt').innerHTML;
            const areaTxt = addressListItem.querySelector('.list-item__additional-info').innerHTML;
            const modalValue = select.closest('.modal-info__value');

            // Создаём элемент адреса
            const addressItem = document.createElement('div');
            const street = document.createElement('span');
            const area = document.createElement('span');

            // Заполняем элемент адреса
            street.innerHTML = streetTxt;
            area.innerHTML = areaTxt;
            addressItem.classList.add('modal-info__value-address');
            street.classList.add('modal-info__street');
            area.classList.add('modal-info__area');
            addressItem.append(street);
            addressItem.append(area);

            modalValue.prepend(addressItem);
            select.style.display = 'none';
        }

        // OTHER LOGIC
        // appeal-interconnected
        createInterconnectedElement(select, input);
        if (item.dataset.categories) createOptions(select, item);
    }

    function handleClick(event) {
        const select = event.target.closest('.i-select');
        if (select) {
            openSelect(select);
        }
        if (event.target.closest('.i-select__item')) {
            selects.forEach((select) => {
                if (select.classList.contains('is-active') && !select.classList.contains('no-close')) closeSelect(select);
            });
        }

        if (!select && !event.target.closest('[data-open-select]')) {
            selects.forEach((select) => {
                if (select.classList.contains('is-active')) closeSelect(select);
            });
        }
    }
});
