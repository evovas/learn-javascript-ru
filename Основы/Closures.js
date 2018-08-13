// Создадим счетчик с методами, используя тот факт, что функция так же является объектом
function makeCounter() {
    var currentCount = 1;

    // возвращать будем данную функцию функцию
    function counter() {
        return currentCount++;
    }

    // и добавим ей методы с помощью присвоения свойствам функции как объекта функций через function definition
    counter.set = function (value) {
        currentCount = value;
    };
    counter.reset = function () {
        currentCount = 1;
    };

    return counter;
}

var counter = makeCounter();
counter(); // 1
counter(); // 2
counter.set(5);
counter(); // 5
counter(); // 6
counter.reset();
counter(); // 1


// Задачи с learn.javascript.ru

// Напишите функцию sum, которая работает так: sum(a)(b) = a+b.
function sum(a) {
    return function (b) {
        return a + b;
    }
}
sum(2)(3); // 5

/*
Задача – реализовать строковый буфер на функциях в JavaScript, со следующим синтаксисом:

Создание объекта: var buffer = makeBuffer();.

Вызов makeBuffer должен возвращать такую функцию buffer,
которая при вызове buffer(value) добавляет значение в некоторое внутреннее хранилище,
а при вызове без аргументов buffer() – возвращает его.
*/
//console.log(String(''));

function makeBuffer() {
    var strBuffer = '';
    return function (arg) {
        if (arg === undefined) {
            return strBuffer;
        } else {
            strBuffer += arg;
        }
    }
}
// Проверка работы функции
var buffer = makeBuffer();
// добавить значения к буферу
buffer('Замыкания');
buffer(' Использовать');
buffer(' Нужно!');
buffer(); // 'Замыкания Использовать Нужно!'

var buffer2 = makeBuffer();
buffer2(0);
buffer2(1);
buffer2(0);
buffer2(); // '010'


/*
Добавьте буферу из решения задачи Функция - строковый буфер метод buffer.clear(),
который будет очищать текущее содержимое буфера:
*/
function makeBuffer2() {
    var strBuffer = '';
    function buffer(arg) {
        if (arg === undefined) {
            return strBuffer;
        } else {
            strBuffer += arg;
        }
    }

    buffer.clear = function () {
        strBuffer = '';
    }

    return buffer;
}
var buffer3 = makeBuffer2();

buffer3("Тест");
buffer3(" тебя не съест ");
buffer3(); // Тест тебя не съест

buffer3.clear();

buffer3(); // ""

/*
Напишите функцию byField(field), которую можно использовать в sort
для сравнения объектов по полю field
*/
//Сортируемый массив
var users = [{
    name: "Вася",
    surname: 'Иванов',
    age: 20
}, {
    name: "Петя",
    surname: 'Чапаев',
    age: 25
}, {
    name: "Маша",
    surname: 'Медведева',
    age: 18
}];

//Сама функция
function byField(field) {
    return function (a, b) {
        return a[field] > b[field] ? 1 : -1;
    }
}

//Проверим работоспособность
users.sort(byField('name'));
users.forEach(function(user) {
    user.name;
}); // Вася, Маша, Петя

users.sort(byField('age'));
users.forEach(function(user) {
    user.name;
}); // Маша, Вася, Петя



function makeArmy() {

    var shooters = [];

    for (var i = 0; i < 10; i++) {
        function makeShooter() {
            var a = i;
            function shooter () { // функция-стрелок
                console.log( a ); // выводит свой номер
            }
            return shooter;
        }
        shooters.push(makeShooter());
    }

    return shooters;
}

var army = makeArmy();

army[0](); // 0
army[5](); // 5
