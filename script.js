const books = document.querySelector('.books');
const bookElems = document.querySelectorAll('.book');
const book1 = bookElems[1];
const book2 = bookElems[0];
const book3 = bookElems[4];
const book5 = bookElems[5];
const book6 = bookElems[2];
const book3TitleA = book3.querySelector('a');
const book2List = book2.querySelector('ul');
const book2ListItem = book2.querySelectorAll('li');
const book5List = book5.querySelector('ul');
const book5ListItem = book5.querySelectorAll('li');
const book6List = book6.querySelector('ul');
const book6ListItem = book6.querySelectorAll('li');
const adv = document.querySelector('.adv');

books.prepend(book1, book2, book3);
books.append(book6);

document.body.style.backgroundImage = 'url("./image/you-dont-know-js.jpg")';

book3TitleA.textContent = 'Книга 3. this и Прототипы Объектов';

adv.remove();

book2List.prepend(book2ListItem[0], book2ListItem[1], book2ListItem[3], book2ListItem[6], book2ListItem[8]);
book2List.append(book2ListItem[2], book2ListItem[10]);

book5List.prepend(book5ListItem[0], book5ListItem[1], book5ListItem[9], book5ListItem[3], book5ListItem[4]);
book5List.append(book5ListItem[5], book5ListItem[8], book5ListItem[10]);

book6List.insertAdjacentHTML('beforeend', '<li>Глава 8: За пределами ES6</li>');
book6List.append(book6ListItem[9]);