'use strict';

class Todo {
    constructor(form, input, todoList, todoCompleted, container) {
        this.form = document.querySelector(form);
        this.input = document.querySelector(input);
        this.todoList = document.querySelector(todoList);
        this.todoCompleted = document.querySelector(todoCompleted);
        this.container = document.querySelector(container);
        this.todoData = new Map(JSON.parse(localStorage.getItem('todoList')));
    }

    addToStorage() {
        localStorage.setItem('todoList', JSON.stringify([...this.todoData]));
    }

    render() {
        this.todoList.textContent = '';
        this.todoCompleted.textContent = '';
        this.todoData.forEach(this.createItem, this);
        this.addToStorage();
    }

    createItem(todo) {
        const li = document.createElement('li');
        li.classList.add('todo-item');
        li.key = todo.key;
        li.insertAdjacentHTML('beforeend', `
                <span class="text-todo">${todo.value}</span>
                <div class="todo-buttons">
                    <button class="todo-edit"></button>
                    <button class="todo-remove"></button>
                    <button class="todo-complete"></button>
                </div>
        `);

        if (todo.completed) {
            this.todoCompleted.append(li);
        } else {
            this.todoList.append(li);
        }
    }

    addTodo(e) {
        e.preventDefault();
        if (this.input.value.trim()) {
            const newTodo = {
                value: this.input.value,
                completed: false,
                key: this.generateKey(),
            };
            this.input.value = '';
            this.todoData.set(newTodo.key, newTodo);
            this.render();
        } else {
            this.input.placeholder = 'Пустое дело добавить нельзя!';
            this.input.value = '';
            setTimeout(() => this.input.placeholder = 'Какие планы?', 1000);
        }
    }

    generateKey() {
        return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    }

    deleteItem(target) {
        const item = target.closest('.todo-item');
        const key = item.key;
        item.style.opacity = 1;

        const fadeIn = setInterval(() => {
            item.style.opacity -= 0.1;

            if (item.style.opacity <= 0.1) {
                clearInterval(fadeIn);
                this.todoData.delete(key);
                this.render();
            }
        }, 30);
    }

    moveAnimation(key, item, obj) {
        // 1. Получаем coordsStart = координаты перемещаемого элемента;
        // 2. Создаем клон перемещаемого элемента;
        // 3. Обновляем Map с данными, полученными из метода completedItem;
        // 4. Рендерим обновленные данные;
        // 5. Получаем coordsEnd - координаты, где оказался наш элемент, элементу задаем 100% прозрачность;
        // 6. Расчитываем дистанцию между клоном и элементом;
        // 7. Запускаем анимацию движения клона к элементу, 1 шаг = 5% дистанции;
        // 8. По достижению клоном позиции элемента удаляем клон из верстки, задаем элементу 0% прозрачность.

        const getCoords = node => {
            const box = node.getBoundingClientRect();

            return {
                top: box.top + pageYOffset,
                left: box.left + pageXOffset,
                width: box.width
            };
        };
        const clone = item.cloneNode(true);
        const coordsStart = getCoords(item);
        clone.style.cssText = `
            position: absolute; 
            top: ${coordsStart.top}px;
            left: ${coordsStart.left}px;
            opacity: 0.5; 
            list-style-type: none; 
            width: ${coordsStart.width}px;
        `;
        document.body.append(clone);

        this.todoData.set(key, obj);
        this.render();

        const items = document.querySelectorAll('.todo-item');
        let targetItem;

        items.forEach(item => {
            if (item.key === key) {
                targetItem = item;
            }
        });

        targetItem.style.opacity = 0;

        const coordsEnd = getCoords(targetItem);

        const distance = Math.abs(coordsEnd.top - coordsStart.top);

        let requestId;
        const move = () => {
            switch (obj.completed) {
            case true :
                clone.style.top = parseInt(clone.style.top) + distance / 100 * 5 + 'px';

                if (parseInt(clone.style.top) >= coordsEnd.top) {
                    cancelAnimationFrame(requestId);
                    clone.remove();
                    targetItem.style.opacity = 1;
                } else {
                    requestId = requestAnimationFrame(move);
                }
                break;

            case false :
                clone.style.top = parseInt(clone.style.top) - distance / 100 * 5 + 'px';

                if (parseInt(clone.style.top) <= coordsEnd.top) {
                    cancelAnimationFrame(requestId);
                    clone.remove();
                    targetItem.style.opacity = 1;
                } else {
                    requestId = requestAnimationFrame(move);
                }
            }
        };

        move();
    }

    completedItem(target) {
        const item = target.closest('.todo-item');
        const key = item.key;
        const completed = this.todoData.get(key).completed;

        const updatedTodo = {
            value: this.todoData.get(key).value,
            key: this.todoData.get(key).key
        };

        switch (completed) {
        case false:
            updatedTodo.completed = true;
            break;
        case true:
            updatedTodo.completed = false;
        }

        this.moveAnimation(key, item, updatedTodo);
    }

    editItem(target) {
        const item = target.closest('.todo-item');
        const itemText = item.querySelector('.text-todo');
        const buttons = document.querySelectorAll('.todo-buttons');
        const key = item.key;
        const saveButton = document.createElement('button');

        itemText.setAttribute('contenteditable', true);
        itemText.focus();
        buttons.forEach(item => item.style.display = 'none');
        this.form.style.display = 'none';
        saveButton.classList.add('todo-save');
        saveButton.textContent = 'Сохранить изменения';
        item.append(saveButton);

        saveButton.addEventListener('click', () => {
            if (!itemText.textContent.trim()) {
                saveButton.style.backgroundColor = 'red';
                saveButton.textContent = 'Нельзя сохранить пустое дело!';
                setTimeout(() => {
                    saveButton.style.backgroundColor = 'rgb(56, 149, 224)';
                    saveButton.textContent = 'Сохранить изменения';
                }, 500);
                return;
            }

            const updatedTodo = {
                value: itemText.textContent,
                completed: this.todoData.get(key).completed,
                key: this.todoData.get(key).key
            };

            this.todoData.set(key, updatedTodo);
            this.render();
            this.form.style.display = 'block';
        });
    }

    handler() {
        this.container.addEventListener('click', e => {
            const target = e.target;

            if (target.matches('.todo-remove')) this.deleteItem(target);

            if (target.matches('.todo-complete')) this.completedItem(target);

            if (target.matches('.todo-edit')) this.editItem(target);
        });
    }

    init() {
        this.form.addEventListener('submit', this.addTodo.bind(this));
        this.render();
        this.handler();
    }
}

const todo = new Todo('.todo-control', '.header-input', '.todo-list', '.todo-completed', '.todo-container');

todo.init();
