const MODAL_ANIMATION_SPEED = 300;

document.addEventListener('DOMContentLoaded', () => {
    document.addEventListener('click', function (e) {
        let self = e.target;
        if (self.closest('[data-modal]')) {
            // клик по кнопке для вызова модалки
            e.preventDefault();
            let newModal = self.closest('[data-modal]').dataset.modal;
            if (document.querySelector('.i-modal.is-active')) {
                closeModal();
                setTimeout(() => openModal(newModal), MODAL_ANIMATION_SPEED);
            } else {
                openModal(newModal);
            }
        } else if (self.closest('[data-modal-next]')) {
            // клик по кнопке для вызова новой модалки(поверх предыдущей, не закрывая её)
            e.preventDefault();
            let newModal = self.closest('[data-modal-next]').dataset.modalNext;
            openModal(newModal, true);
        } else if (self.closest('[data-modal-close]')) {
            // клик по кнопке для закрытия модалки
            closeModal();
        } else if (self.classList.contains('i-modal', 'is-active')) {
            // клик по внешней области модалки(оверлею), чтобы закрыть её
            closeModal();
        }
    });
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' || e.key === 'Esc' || e.keyCode === 27) {
            closeModal();
        }
    });

    // ИЗМЕНЕНИЕ ВИДА МОДАЛЬНОГО ОКНА
    const allModals = document.querySelectorAll('.i-modal');
    if (allModals) {
        function changeModalView(radio, modal) {
            const rightSide = modal.querySelector('.right-side');
            const historyItem = modal.querySelector('.modal-info__item-history');
            const modalInfo = modal.querySelector('.modal-info');
            const map = modal.querySelector('.modal-info__item--map');
            // sidebar
            const sidebar = document.querySelector('.sidebar');
            const wrapper = document.querySelector('.wrapper');
            // Добавлять класс или нет
            let addBorder = modal.classList.contains('modal-appeal') ? true : false;

            if (radio.value === 'horizontal' && historyItem) {
                modal.classList.add('is-horizontal');
                historyItem.classList.remove('modal-info__item--border');
                rightSide.append(historyItem);
                // Скрытие sidebar
                sidebar.classList.add('collapsed');
                wrapper.classList.add('sidebar-collapsed');
            } else {
                if (addBorder) historyItem?.classList.add('modal-info__item--border');
                modal.classList.remove('is-horizontal');
                if (historyItem && map) {
                    map.after(historyItem);
                } else if (historyItem) {
                    modalInfo.append(historyItem);
                }
                addBorder = false;
            }
        }

        allModals.forEach((modal) => {
            const viewToggler = modal.querySelectorAll('.view-toggler input');
            if (viewToggler) {
                viewToggler.forEach((radio) => {
                    radio.addEventListener('change', () => changeModalView(radio, modal));
                });
            }
        });
    }

    // КНОПКА ПОДЕЛИТЬСЯ
    let shareBtns = document.querySelectorAll('.modal-share');
    function setActiveForShare(event, button) {
        event.preventDefault();
        navigator.clipboard.writeText(button.href);
        button.classList.add('is-active');
        setTimeout(() => {
            button.classList.remove('is-active');
        }, 2000);
    }
    shareBtns.forEach((btn) => {
        btn.addEventListener('click', (e) => setActiveForShare(e, btn));
    });
});

// openModal('modal-first') - обычный вызов модального окна (аналог data-modal)
// openModal('modal-second',true) - вызов нового модального окна поверх прежнего (аналог data-modal-next)
function openModal(newModal, nextBool) {
    // nextBool - boolean
    if (!newModal) return;
    let modal = document.querySelector('.' + newModal + '');
    if (!modal) return;
    setTimeout(() => {
        if (nextBool) {
            // если есть next-modal
            if (document.querySelector('.i-modal.i-modal--2deep')) {
                // модалка со 2-й глубиной
                modal.classList.add('i-modal--3deep');
            } else {
                // модалка с 3-й глубиной
                modal.classList.add('i-modal--2deep');
            }
        } else {
            // дефолтное поведение, если нет next-модалки
            document.body.classList.add('modal-open');
            noScroll.disableScroll();
            // Закрытие sidebar если < 1200px
            if (window.innerWidth < 1200) {
                const sidebar = document.querySelector('.sidebar');
                const wrapper = document.querySelector('.wrapper');
                if (!sidebar.classList.contains('collapsed')) {
                    sidebar.classList.add('collapsed');
                    wrapper.classList.add('sidebar-collapsed');
                }
            }
        }
        modal.classList.add('is-active');
        let isIE = /*@cc_on!@*/ false || !!document.documentMode;
        if (isIE === true) {
            if (modal.querySelector('.i-modal__content').offsetHeight > window.innerHeight) {
                modal.style.display = 'block';
            } else {
                modal.style.display = '';
            }
        }
    }, 0);
}
// closeModal() - закрывает текущее модальное окно
// closeModal(true) - закрывает все модальные окна
function closeModal(closeall) {
    //closeall - boolean
    if (document.body.classList.contains('modal-open') && !document.body.classList.contains('mob-nav-open')) {
        if (!closeall) {
            // закрыть глубинную модалку
            if (document.querySelector('.i-modal--3deep')) {
                // если есть 3-я глубинная модалка
                let modal = document.querySelector('.i-modal--3deep');
                modal.classList.remove('is-active');
                setTimeout(() => modal.classList.remove('i-modal--3deep'), MODAL_ANIMATION_SPEED);
                return;
            } else if (document.querySelector('.i-modal--2deep')) {
                // если есть 2-я глубинная модалка
                let modal = document.querySelector('.i-modal--2deep');
                modal.classList.remove('is-active');
                setTimeout(() => modal.classList.remove('i-modal--2deep'), MODAL_ANIMATION_SPEED);
                return;
            }
        }
        document.body.classList.remove('modal-open');
        document.querySelectorAll('.i-modal.is-active').forEach(function (el) {
            el.classList.remove('is-active', 'i-modal--2deep', 'i-modal--3deep');
        });
        setTimeout(() => {
            noScroll.enableScroll();
        }, MODAL_ANIMATION_SPEED);
    } else if (document.body.classList.contains('mob-nav-open')) {
        document.body.classList.remove('modal-open');
        document.querySelectorAll('.i-modal.is-active').forEach(function (el) {
            el.classList.remove('is-active');
        });
    }
}

window.openModal = openModal;
window.closeModal = closeModal;
window.MODAL_ANIMATION_SPEED = MODAL_ANIMATION_SPEED;
