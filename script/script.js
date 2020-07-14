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

    countTimer('15 july 2020 7:35');

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

    //плавный скролл

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

    smoothScroll();

    //слайдер

    const slider = () => {
        const slide = document.querySelectorAll('.portfolio-item');
        const dots = document.querySelector('.portfolio-dots');

        slide.forEach(() => {
            const newDot = document.createElement('li');
            newDot.classList.add('dot');
            dots.append(newDot);
            if (dots.childElementCount === 1) newDot.classList.add('dot-active');
        });

        const dot = document.querySelectorAll('.dot');
        const sliderElem = document.querySelector('.portfolio-content');

        let currentSlide = 0;
        let interval;

        const prevSlide = (elem, index, strClass) => {
            elem[index].classList.remove(strClass);
        };

        const nextSlide = (elem, index, strClass) => {
            elem[index].classList.add(strClass);
        };

        const autoPlaySlide = () => {
            prevSlide(slide, currentSlide, 'portfolio-item-active');
            prevSlide(dot, currentSlide, 'dot-active');
            currentSlide++;
            if (currentSlide >= slide.length) {
                currentSlide = 0;
            }
            nextSlide(slide, currentSlide, 'portfolio-item-active');
            nextSlide(dot, currentSlide, 'dot-active');
        };

        const startSlide = (time = 3000) => {
            interval = setInterval(autoPlaySlide, time);
        };

        const stopSlide = () => {
            clearInterval(interval);
        };

        sliderElem.addEventListener('click', event => {
            event.preventDefault();

            const target = event.target;

            if (!target.matches('.portfolio-btn, .dot')) {
                return;
            }

            prevSlide(slide, currentSlide, 'portfolio-item-active');
            prevSlide(dot, currentSlide, 'dot-active');

            if (target.matches('#arrow-right')) {
                currentSlide++;
            } else if (target.matches('#arrow-left')) {
                currentSlide--;
            } else if (target.matches('.dot')) {
                dot.forEach((elem, index) => {
                    if (elem === target) {
                        currentSlide = index;
                    }
                });
            }

            if (currentSlide >= slide.length) {
                currentSlide = 0;
            }

            if (currentSlide < 0) {
                currentSlide = slide.length - 1;
            }

            nextSlide(slide, currentSlide, 'portfolio-item-active');
            nextSlide(dot, currentSlide, 'dot-active');
        });

        sliderElem.addEventListener('mouseover', event => {
            if (event.target.matches('.portfolio-btn') ||
                event.target.matches('.dot')) {
                stopSlide();
            }
        });

        sliderElem.addEventListener('mouseout', event => {
            if (event.target.matches('.portfolio-btn') ||
                event.target.matches('.dot')) {
                startSlide();
            }
        });

        startSlide(1500);
    };

    slider();

    //смена фотографии по наведению курсора

    const eventListeners = () => {
        const photos = document.querySelectorAll('.command__photo');
        const switchPhoto = photo => {
            const src = photo.getAttribute('src');
            const dataImg = photo.getAttribute('data-img');

            photo.setAttribute('src', dataImg);
            photo.setAttribute('data-img', src);
        };

        photos.forEach(photo => {
            photo.addEventListener('mouseenter', switchPhoto.bind(this, photo));
        });

        photos.forEach(photo => {
            photo.addEventListener('mouseleave', switchPhoto.bind(this, photo));
        });
    };

    eventListeners();

    //калькулятор

    const calc = (price = 100) => {
        const calcBlock = document.querySelector('.calc-block');
        const calcType = document.querySelector('.calc-type');
        const calcSquare = document.querySelector('.calc-square');
        const calcDay = document.querySelector('.calc-day');
        const calcCount = document.querySelector('.calc-count');
        const totalValue = document.getElementById('total');
        let requestId;

        const countAnimation = num => {
            totalValue.textContent = 0;

            const step = () => {
                const currentValue = parseInt(totalValue.textContent);

                if (currentValue < num) {
                    requestId = requestAnimationFrame(step);
                } else {
                    cancelAnimationFrame(requestId);
                }

                totalValue.textContent = (num > 50000 && currentValue + 10000 < num) ? num - 10000 :
                    (num > 10000 && currentValue + 5000 < num) ? currentValue + 1000 :
                        (num > 1000 && currentValue + 500 < num) ? currentValue + 100 :
                            (num > 100 && currentValue + 50 < num) ? currentValue + 10 :
                                (num > currentValue) ? currentValue + 1 :
                                    currentValue;
            };

            step();
        };

        const countSum = () => {
            let total = 0;
            let countValue = 1;
            let dayValue = 1;
            const typeValue = calcType.options[calcType.selectedIndex].value;
            const squareValue = +calcSquare.value;

            if (calcCount.value > 1) {
                countValue += (calcCount.value - 1) / 10;
            }

            if (calcDay.value && calcDay.value < 5) {
                dayValue *= 2;
            } else if (calcDay.value && calcDay.value < 10) {
                dayValue *= 1.5;
            }

            if (typeValue && squareValue) {
                total = price * typeValue * squareValue * countValue * dayValue;
                countAnimation(total);
                console.log(total);
            } else {
                totalValue.textContent = 0;
            }
        };

        calcBlock.addEventListener('change', e => {
            const target = e.target;

            if (target.matches('select') || target.matches('input')) {
                cancelAnimationFrame(requestId);
                countSum();
            }
        });

        calcBlock.addEventListener('input', e => {
            if (e.target.matches('input')) {
                e.target.value = e.target.value.replace(/\D/, '');
            }
        });
    };

    calc(100);

    //работа с формами

    const formsHandler = () => {
        const form1 = document.getElementById('form1');
        const form2 = document.getElementById('form2');
        const form3 = document.getElementById('form3');

        const loading = () => {
            const wrapper = document.createElement('div');
            wrapper.classList.add('loading');

            for (let i = 0; i < 3; i++) {
                const animationElem = document.createElement('div');
                animationElem.classList.add('line');
                wrapper.appendChild(animationElem);
            }

            return wrapper;
        };


        //send-ajax-form

        const sendForm = form => {
            const errorMsg = 'Что-то пошло не так...';
            const successMsg = 'Спасибо! Мы скоро с вами свяжемся!';
            const statusMessage = document.createElement('div');

            statusMessage.style.cssText = 'font-size: 2rem;';

            const postData = body => {
                return new Promise((resolve, reject) => {
                    const request = new XMLHttpRequest();
                    request.addEventListener('readystatechange', () => {
                        if (request.readyState !== 4) {
                            return;
                        }

                        if (request.status === 200) {
                            resolve(statusMessage.textContent = successMsg);
                            form.reset();
                        } else {
                            reject(statusMessage.textContent = errorMsg);
                        }
                    });

                    request.open('POST', './server.php');
                    request.setRequestHeader('Content-Type', 'application/JSON');
                    request.send(JSON.stringify(body));
                });
            };

            form.addEventListener('submit', event => {
                event.preventDefault();

                if (form.id === 'form3') statusMessage.style.color = '#fff';
                form.appendChild(statusMessage);
                statusMessage.appendChild(loading());

                const formData = new FormData(form);
                const body = {};

                for (const val of formData.entries()) {
                    body[val[0]] = val[1];
                }

                postData(body)
                    .then()
                    .catch(error => console.error(error));
            });
        };

        const valid = () => {
            const maskPhone = (selector, masked = '+7 (___) ___-__-__') => {
                const elems = document.querySelectorAll(selector);

                const mask = event => {
                    const keyCode = event.keyCode;
                    const template = masked;
                    const target = event.target;

                    const def = template.replace(/\D/g, '');
                    const val = target.value.replace(/\D/g, '');
                    let i = 0;
                    let newValue = template.replace(/[_\d]/g, a => (i < val.length ? val.charAt(i++) || def.charAt(i) : a));
                    i = newValue.indexOf('_');

                    if (i !== -1) {
                        newValue = newValue.slice(0, i);
                    }

                    let reg = template.substr(0, target.value.length).replace(/_+/g, a => '\\d{1,' + a.length + '}').replace(/[+()]/g, '\\$&');
                    reg = new RegExp('^' + reg + '$');

                    if (!reg.test(target.value) || target.value.length < 5 || keyCode > 47 && keyCode < 58) {
                        target.value = newValue;
                    }

                    if (event.type === 'blur' && target.value.length < 5) {
                        target.value = '';
                    }
                };

                for (const elem of elems) {
                    elem.addEventListener("input", mask);
                    elem.addEventListener("focus", mask);
                    elem.addEventListener("blur", mask);

                    elem.setAttribute('autocomplete', 'off');
                }

            };

            const validText = selector => {
                const elems = document.querySelectorAll(selector);

                elems.forEach(elem => {
                    elem.addEventListener('input', e => {
                        const target = e.target;
                        const placeholder = target.attributes.placeholder.textContent;
                        const regExp = /[^а-яА-ЯёЁ\s]+$/g;
                        target.value = target.value.replace(regExp, '');

                        if (regExp.test(e.data) && !!e.data) {
                            target.style.border = 'solid red';
                        } else if (placeholder === 'Ваше имя' && target.value.length > 20) {
                            target.value = target.value.substring(0, 20);
                            target.style.border = 'solid red';
                        } else if (placeholder === 'Ваше сообщение' && target.value.length > 200) {
                            target.value = target.value.substring(0, 200);
                            target.style.border = 'solid red';
                        } else {
                            target.style.border = '';
                        }
                    });

                    elem.setAttribute('autocomplete', 'off');
                });
            };

            maskPhone('.form-phone');
            validText('[placeholder="Ваше имя"], [placeholder="Ваше сообщение"]');
        };

        sendForm(form1);
        sendForm(form2);
        sendForm(form3);
        valid();
    };

    formsHandler();
});
