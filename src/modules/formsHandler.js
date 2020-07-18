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
            return fetch('./server.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/JSON'
                },
                body: JSON.stringify(body)
            });
        };

        form.addEventListener('submit', event => {
            event.preventDefault();
            const phone = form.querySelector('.form-phone');

            if (phone.value.length !== 18) {
                phone.style.border = '2px solid red';
                setTimeout(() => {
                    phone.style.border = '';
                }, 600);
                return;
            }

            if (form.id === 'form3') statusMessage.style.color = '#fff';
            form.appendChild(statusMessage);
            statusMessage.appendChild(loading());

            const formData = new FormData(form);
            const body = {};

            for (const val of formData.entries()) {
                body[val[0]] = val[1];
            }

            postData(body)
                .then(response => {
                    if (response.status !== 200) {
                        throw new Error('Status: not 200');
                    } else {
                        return response;
                    }
                })
                .then(response => {
                    statusMessage.textContent = successMsg;
                    form.reset();
                    setTimeout(() => statusMessage.textContent = '', 1500);
                })
                .catch(error => {
                    console.error(error);
                    statusMessage.textContent = errorMsg;
                    setTimeout(() => statusMessage.textContent = '', 1500);
                });
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

                let reg = template.substr(0, target.value.length)
                    .replace(/_+/g, a => '\\d{1,' + a.length + '}').replace(/[+()]/g, '\\$&');
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

        const validEmail = selector => {
            const elems = document.querySelectorAll(selector);

            elems.forEach(elem => {
                elem.addEventListener('input', e => {
                    const target = e.target;
                    const regExp = /[^A-Za-z0-9-_.@]+/g;
                    target.value = target.value.replace(regExp, '');

                    if (regExp.test(e.data) && !!e.data) {
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
        validEmail('[placeholder="E-mail"], [placeholder="Ваш E-mail"]');
    };

    sendForm(form1);
    sendForm(form2);
    sendForm(form3);
    valid();
};

export default formsHandler;
