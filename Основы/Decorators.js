/*Декоратор – приём программирования, который позволяет взять существующую функцию и изменить/расширить ее поведение.
* Декоратор получает функцию и возвращает обертку, которая делает что-то своё «вокруг» вызова основной функции.
*/
//Создадим декоратор, который принимает функцию и массив, который описывает для какого аргумента какую проверку типа применять:
{
    // вспомогательная функция для проверки на число
    function checkNumber(value) {
        return typeof value == 'number';
    }

    // декоратор, проверяющий типы для f
    // второй аргумент checks - массив с функциями для проверки
    function typeCheck(f, checks) {
        return function() {
            for (var i = 0; i < arguments.length; i++) {
                if (!checks[i](arguments[i])) {
                    console.log( "Некорректный тип аргумента номер " + i );
                    return;
                }
            }
            return f.apply(this, arguments);
        }
    }

    function sum(a, b) {
        return a + b;
    }

    // обернём декоратор для проверки
    sum = typeCheck(sum, [checkNumber, checkNumber]); // оба аргумента - числа

    // пользуемся функцией как обычно
    console.log( sum(1, 2) ); // 3, все хорошо

    // а вот так - будет ошибка
    sum(true, null); // некорректный аргумент номер 0
    sum(1, ["array", "in", "sum?!?"]); // некорректный аргумент номер 1
}

/*Декораторы можно не только повторно использовать, но и комбинировать!*/

/*ЗАДАЧИ LEARN JAVASCRIPT*/
/*Логирующий декоратор (много аргументов) https://learn.javascript.ru/task/logging-decorator-arguments*/
{
    console.log();
    console.log('Задача 2');

    function work(a, b) {
        /* ... */ // work - произвольная функция, один аргумент
        console.log('Работа функции задачи 2: ' + (a + b));
    }

    function makeLogging(f, log) {
        return function () {
            log.push([].slice.call(arguments));
            return f.apply(this, arguments);
        }
    }

    var log = [];
    work = makeLogging(work, log);

    work(1, 2, 3); // 3 функция сложит два первых числа, но в логах всеравно будут записаны все аргументы
    work(4, 5); // 9

    for (var i = 0; i < log.length; i++) {
        var args = log[i]; // массив из аргументов i-го вызова
        console.log( 'Лог:' + args.join() ); // "Лог:1,2", "Лог:4,5"
    }
}

/*Кеширующий декоратор https://learn.javascript.ru/task/caching-decorator*/
{
    function f(x) {
        return Math.random() * x; // random для удобства тестирования
    }
    /* Вариант с массивами
    function makeCaching(f) {
        var args = [];
        var cache = [];
        function wrapper(arg) {
            var searchInd = args.indexOf(arg);
            if (searchInd === -1) {
                args.push(arg);
                var tempCache = f.call(this, arg);
                cache.push(tempCache);
                return tempCache;
            } else {
                return cache[searchInd];
            }
        }
        return wrapper;
    }
    */

    //Вариант с объектом
    function makeCaching(f) {
        var args = {};
        function wrapper(arg) {
            if (!args.hasOwnProperty(arg)) {
                args[arg] = f.call(this, arg);
            }
            return args[arg];
        }
        return wrapper;
    }
    f = makeCaching(f);

    var a, b;

    a = f(1);
    b = f(1);
    console.log( a == b ); // true (значение закешировано)

    b = f(2);
    console.log( a == b ); // false, другой аргумент => другое значение
}


