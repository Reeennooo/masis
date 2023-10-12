import { openTooltip } from '../tooltip/tooltip';

document.addEventListener('DOMContentLoaded', () => {
    let buttonBind = document.querySelector('.button-bind');
    if (buttonBind) {
        buttonBind.addEventListener('click', (e) => {
            if (buttonBind.hasAttribute('data-open-tooltip')) {
                openTooltip(buttonBind);
            }
        });
    }
});
