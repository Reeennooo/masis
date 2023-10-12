document.addEventListener('DOMContentLoaded', () => {
    const textareas = document.querySelectorAll('.textarea-wrapper textarea');
    if (textareas) {
        textareas.forEach((textarea) => {
            textarea.addEventListener('keyup', function () {
                if (this.scrollTop > 0) {
                    this.style.height = this.scrollHeight + 'px';
                } 
                else if(!textarea.value.length) {
                    this.style.height = '';
                }
            });
        });
    }
});
