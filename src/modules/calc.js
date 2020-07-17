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

export default calc;
