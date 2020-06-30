const getDateTime = function() {
    const greeting = document.querySelector('.greeting');
    const weekDay = document.querySelector('.weekday');
    const time = document.querySelector('.time');
    const newYear = document.querySelector('.newyear');

    const renderGreeting = () => {
        const hours = new Date().getHours();

        switch (true) {

        case hours >= 6 && hours <= 11 :
            greeting.textContent = 'Доброе утро';
            break;
        case hours >= 12 && hours <= 16 :
            greeting.textContent = 'Добрый день';
            break;
        case hours >= 17 && hours <= 22 :
            greeting.textContent = 'Добрый вечер';
            break;
        case hours >= 23 || hours <= 6 :
            greeting.textContent = 'Доброй ночи';
        }
    };

    const renderWeekDay = () => {
        const day = new Date().getDay();
        const weekDays = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];

        weekDay.textContent = `Сегодня: ${weekDays[day]}`;
    };

    const renderTime = () => {
        const date = new Date();
        let hours = date.getHours();
        let minutes = date.getMinutes();
        let seconds = date.getSeconds();
        const ampm = hours >= 12 ? 'PM' : 'AM';

        hours %= 12;
        hours = hours ? hours : 12;
        hours = hours < 10 ? '0' + hours : hours;
        minutes = minutes < 10 ? '0' + minutes : minutes;
        seconds = seconds < 10 ? '0' + seconds : seconds;

        time.textContent = `Текущее время: ${hours}:${minutes}:${seconds} ${ampm}`;
    };

    const renderNewYear = () => {
        const todayDate = new Date();
        const newYearDate = new Date('1 january 2021');
        const daysRemaining = Math.ceil((newYearDate - todayDate) / 86400000); //количество милисекунд в дне

        newYear.textContent = `До нового года осталось ${daysRemaining} дней`;
    };

    renderGreeting();
    renderWeekDay();
    renderTime();
    renderNewYear();
    setInterval(renderTime, 1000);
};

getDateTime();
