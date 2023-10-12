document.addEventListener('DOMContentLoaded', () => {
    const customInput = document.querySelector('.comment-area__content');

    let commentAreas = document.querySelectorAll('.comment-area');
    if (commentAreas) {
        commentAreas.forEach((area) => {
            let markPersonBtn = area.querySelector('.comment-area__button.mark-person');
            if (markPersonBtn) {
                markPersonBtn.addEventListener('click', () => {
                    area.querySelector('.comment-area__select').classList.add('is-active');
                });
            }
        });
    }
});
