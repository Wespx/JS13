const toggleMenu = () => {
    const menu = document.querySelector('menu');

    document.addEventListener('click', event => {
        const target = event.target;

        if (!menu.classList.contains('active-menu')) {
            if (target.closest('.menu')) {
                menu.classList.toggle('active-menu');
            }
        } else {
            if (!target.closest('menu') || target.tagName === 'A') {
                menu.classList.toggle('active-menu');
            }
        }
    });
};

export default toggleMenu;
