export function openTooltip(clickedElement) {
    let tooltips = document.querySelectorAll('.tooltip');
    tooltips.forEach((tooltip) => {
        if (tooltip !== clickedElement.closest('.tooltip')) {
            tooltip.classList.remove('is-active');
        }
    });

    switch (clickedElement.dataset.openTooltip) {
        case 'tooltip-new-work':
            document.querySelector('.tooltip-new-work').classList.toggle('is-active');
            break;
        case 'leak':
            document.querySelector('.tooltip-leak').classList.toggle('is-active');
            break;
        case 'blackouts':
            document.querySelector('.tooltip-blackouts').classList.toggle('is-active');
            break;
        case 'new-emergency-element':
            document.querySelector('.new-emergency-element').classList.toggle('is-active');
            break;
        case 'tooltip-comments':
            document.querySelector('.tooltip-comments').classList.toggle('is-active');
            break;
        case 'tooltip-bind':
            document.querySelector('.tooltip-bind').classList.toggle('is-active');
            break;
        case 'tooltip-small-mechanization':
            document.querySelector('.tooltip-small-mechanization').classList.toggle('is-active');
            break;
        case 'tooltip-executor':
            document.querySelector('.tooltip-executor').classList.toggle('is-active');
            break;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    let tooltips = document.querySelectorAll('.tooltip');

    document.addEventListener('click', (event) => {
        if (event.target.hasAttribute('data-open-tooltip')) {
            openTooltip(event.target);
        } else if ((!event.target.hasAttribute('data-open-tooltip') && !event.target.closest('.tooltip')) || event.target.closest('.tooltip__close')) {
            tooltips.forEach((element) => element.classList.remove('is-active'));
        }
    });
});
