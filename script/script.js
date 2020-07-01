window.addEventListener('DOMContentLoaded', () => {
    const countTimer = deadline => {
        const timerHours = document.querySelector('#timer-hours');
        const timerMinutes = document.querySelector('#timer-minutes');
        const timerSeconds = document.querySelector('#timer-seconds');
        let idInterval;

        const getTimeRemaining = () => {
            const dateStop = new Date(deadline).getTime();
            const dateNow = new Date().getTime();
            const timeRemaining = (dateStop - dateNow) / 1000;
            let seconds = Math.floor(timeRemaining % 60);
            let minutes = Math.floor((timeRemaining / 60) % 60);
            let hours = Math.floor(timeRemaining / 60 / 60);

            if (hours < 10) {
                hours = '0' + hours;
            }

            if (minutes < 10) {
                minutes = '0' + minutes;
            }

            if (seconds < 10) {
                seconds = '0' + seconds;
            }

            return { timeRemaining, hours, minutes, seconds };
        };

        const updateClock = () => {
            const timer = getTimeRemaining();

            if (timer.timeRemaining <= 0) {
                idInterval = clearInterval(idInterval);
                return false;
            }

            timerHours.textContent = timer.hours;
            timerMinutes.textContent = timer.minutes;
            timerSeconds.textContent = timer.seconds;

            return true;
        };

        const startTimer = () => {
            const start = updateClock();

            if (start) {
                return setInterval(updateClock, 1000);
            } else {
                timerHours.textContent = '00';
                timerMinutes.textContent = '00';
                timerSeconds.textContent = '00';
            }
        };

        idInterval = startTimer();
    };

    countTimer('1 july 2020 7:35');

    //меню

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

    toggleMenu();

    //popup

    const togglePopUp = () => {
        const popUp = document.querySelector('.popup');
        const popUpBtn = document.querySelectorAll('.popup-btn');
        const popUpContent = document.querySelector('.popup-content');
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

    togglePopUp();

    //табы

    const tabs = () => {
        const tabHeader = document.querySelector('.service-header');
        const tab = tabHeader.querySelectorAll('.service-header-tab');
        const tabContent = document.querySelectorAll('.service-tab');

        const toggleTabContent = index => {
            for (let i = 0; i < tabContent.length; i++) {
                if (index === i) {
                    tab[i].classList.add('active');
                    tabContent[i].classList.remove('d-none');
                } else {
                    tab[i].classList.remove('active');
                    tabContent[i].classList.add('d-none');
                }
            }
        };

        tabHeader.addEventListener('click', event => {
            let target = event.target;
            target = target.closest('.service-header-tab');

            if (target) {
                tab.forEach((item, i) => {
                    if (item === target) {
                        toggleTabContent(i);
                    }
                });
            }
        });
    };

    tabs();
});
