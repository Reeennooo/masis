import { openTooltip } from '../tooltip/tooltip';

document.addEventListener('DOMContentLoaded', () => {
    let buttons = document.querySelectorAll('.button-assigment');

    buttons.forEach((button) => {
        button.addEventListener('click', (event) => {
            openTooltip(button);
        });
    });
});
