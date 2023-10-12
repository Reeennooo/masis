document.addEventListener('DOMContentLoaded', () => {
    const optionsWrappers = document.querySelectorAll('.additional-option-wrapper');
    const tooltips = document.querySelectorAll('.tooltip');

    class NoScrollModal {
        constructor() {
            this.currentModalContent;
        }

        setCurrentModal(item) {
            this.currentModalContent = item.closest('.i-modal__content');
        }

        blockScrollInModal() {
            if (window.innerWidth < 767 && this.currentModalContent) {
                this.currentModalContent.classList.add('tooltip-open');
            }
        }

        enableScrollInModal() {
            if (window.innerWidth < 767 && this.currentModalContent) {
                this.currentModalContent.classList.remove('tooltip-open');
            }
        }
    }
    let currentModal = new NoScrollModal();

    // СЧИТЫВАНИЕ КЛИКОВ
    document.addEventListener('click', (e) => {
        if ((!e.target.closest('.additional-option__add') && !e.target.closest('.tooltip')) || e.target.closest('.tooltip__close')) {
            currentModal.enableScrollInModal();
        }
    });

    optionsWrappers.forEach((wrapper) => {
        let option = wrapper.querySelector('.additional-option');
        let optionsList = wrapper.querySelector('.additional-options-list');
        let innerContent = wrapper.querySelector('.additional-options-list__inner');
        option.querySelector('.additional-option__add').addEventListener('click', (e) => {
            if (option.querySelector('.i-select') && !option.hasAttribute('data-open-tooltip')) {
                option.querySelector('.i-select').classList.add('is-active');
                return;
            }
            currentModal.setCurrentModal(option);
            currentModal.blockScrollInModal();
        });

        // Открытие внутренней части
        let optionToggler = option.querySelector('.additional-option__toggle');
        if (optionToggler) {
            optionToggler.addEventListener('click', () => {
                wrapper.classList.toggle('is-active');
                if (wrapper.classList.contains('is-active')) {
                    optionsList.style.height = `${innerContent.offsetHeight}px`;
                } else {
                    optionsList.style = '';
                }
            });
        }
    });

    // Пернос тултипов внутрь wrapper.
    // Для того чтобы на телефоне, тултип занимал весь экран.
    let MatchMedia = window.matchMedia('(max-width: 767px)');
    let wrapper = document.querySelector('.wrapper');
    if (MatchMedia.matches) {
        tooltips.forEach((element) => {
            wrapper.append(element);
        });
    }

    MatchMedia.addEventListener('change', (event) => {
        if (event.matches) {
            tooltips.forEach((element) => {
                wrapper.append(element);
            });
        }
    });
});
