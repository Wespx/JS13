const togglePopUp = () => {
    const popUp = document.querySelector('.popup');
    const popUpBtn = document.querySelectorAll('.popup-btn');
    const popUpContent = document.querySelector('.popup-content');
    const form = document.getElementById('form3');
    const startPos = '100%';
    const endPos = '10%';

    const renderPopUp = () => {
        popUpContent.style.top = parseInt(popUpContent.style.top) - 5 + '%';
        const id = requestAnimationFrame(renderPopUp);

        if (popUpContent.style.top === endPos) {
            cancelAnimationFrame(id);
        }
    };

    popUpBtn.forEach(elem => {
        elem.addEventListener('click', () => {
            popUp.style.display = 'block';
            form.reset();
            if (window.innerWidth > 768) {
                popUpContent.style.top = startPos;
                renderPopUp();
            }
        });
    });

    popUp.addEventListener('click', event => {
        let target = event.target;

        if (target.classList.contains('popup-close')) {
            popUp.style.display = 'none';
        } else {
            target = target.closest('.popup-content');

            if (!target) {
                popUp.style.display = 'none';
            }
        }
    });
};

export default togglePopUp;
