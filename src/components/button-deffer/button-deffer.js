document.addEventListener('DOMContentLoaded', () => {
    let buttonDeffer = document.querySelector('.button-deffer');
    let tooltip = buttonDeffer.querySelector('.button-deffer__tooltip');

    buttonDeffer.addEventListener('click', (e) => {
        if (!e.target.closest('.button-deffer__tooltip')) {
            tooltip.classList.toggle('is-active');
        }
    });
});
