const smoothScroll = () => {
    const menu = document.querySelector('menu');
    const menuAnchors = menu.querySelectorAll('ul>li');
    const firstScreenScroll = document.querySelector('[href="#service-block"]');
    const speed = 0.3;
    const scrollAnimation = event => {
        event.preventDefault();
        const target = event.target.closest('[href]');
        if (!target) return;

        const scroll = window.pageYOffset;
        const hash = target.href.replace(/[^#]*(.*)/, '$1');
        const distance = document.querySelector(hash).getBoundingClientRect().top;
        let start;

        const step = time => {
            if (!start) start = time;
            const progress = time - start;

            const move = (distance < 0 ?
                Math.max(scroll - progress / speed, scroll + distance) :
                Math.min(scroll + progress / speed, scroll + distance));

            window.scrollTo(0, move);

            if (move !== scroll + distance) {
                requestAnimationFrame(step);
            } else {
                location.hash = hash;
            }
        };

        requestAnimationFrame(step);
    };

    firstScreenScroll.addEventListener('click', scrollAnimation);
    menuAnchors.forEach(elem => {
        elem.addEventListener('click', scrollAnimation);
    });
};

export default smoothScroll;
