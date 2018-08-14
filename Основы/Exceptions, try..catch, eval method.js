//Функция eval(code) позволяет выполнить код, переданный ей в виде строки.
var a = 1;
(function() {
    var a = 2;
    eval(' console.log(a) '); // 2
})();
//eval is evil!

//Перехват ошибок, "try..catch"

try {
/*.. пробуем выполнить код ..*/
} catch(e) {
/*.. перехватываем исключение ..*/
} finally {
/*.. выполняем всегда ..*/
}

//При ошибке в try скрипт не «падает», и мы получаем возможность обработать ошибку внутри catch.

try {
    console.log('Начало блока try');  // (1) <-- Выполнится
    lalala; // ошибка, переменная не определена!
    console.log('Конец блока try');  // (2) (не выполнится)
} catch(e) {
    console.log('Ошибка ' + e.name + ":" + e.message + "\n" + e.stack); // (3) <-- Выполнится
}
console.log("Потом код продолжит выполнение..."); // (4) <-- Выполнится


//Проброс ошибок catch(err) должен обрабатывать только те ошибки,
//которые мы рассчитываем в нём увидеть, остальные – пробрасывать дальше через throw err.
console.log('\n\nПроброс ошибок');
function readData() {
    var data = '{ "name": "Вася", "age": 30 }'; // данные корректны
    try {
        var user = JSON.parse(data);
        if (!user.name) {
            throw new SyntaxError("Ошибка в данных"); // с корректными данными новая ошибка создаваться не будет
        }
        blabla(); // произошла непредусмотренная ошибка
        console.log(user.name);
    } catch (e) {
        if (e.name === "SyntaxError") {
            console.log("Извините, в данных ошибка (" + e.name + ')'); //с корректными данными эта строка не выполнится
        } else {
            throw e; // выполнится эта строка, и ошибка выбросится во внешшний код
        }
    }
}

try {
    readData();
} catch (e) {
    console.log( "Поймал во внешнем catch: " + e ); // ловим ошибку выброшенную внутри функции
}


//Оборачивание исключений
console.log('\n\nОборачивание исключений');
function ReadError(message, cause) { //Создадим собственный тим исключений
    this.message = message;
    this.cause = cause;
    this.name = 'ReadError';
    this.stack = cause.stack;
}

function readData2() {
    var data = '{ bad data }';

    try {
        // ...
        //qwqw();
        JSON.parse(data);
        // ...
    } catch (e) {  //На этом уровне перечисляем все ошибки которые будут "переделаны" в новый тип, остальные пробрасываем
        // ...
        if (e.name === 'URIError') {
            throw new ReadError("Ошибка в URI", e);
        } else if (e.name === 'SyntaxError') {
            throw new ReadError("Синтаксическая ошибка в данных", e);
        } else {
            throw e; // пробрасываем
        }
    }
}

try {
    readData2();
} catch (e) { //На этом уровне мы знаем только о ошибках "нового типа" или об остальных, которые мы пробрасываем
    if (e.name === 'ReadError') {
        console.log( e.message );
        console.log( e.cause ); // оригинальная ошибка-причина
    } else {
        throw e;
    }
}


/*ЗАДАЧИ LEARN JAVASCRIPT*/
console.log('\n\nЗАДАЧИ LEARN JAVASCRIPT');
/*Eval-калькулятор с ошибками https://learn.javascript.ru/task/eval-calculator-errors*/
function evalCalc(str) {
    try {
        var result = eval(str);
        if (isNaN(result)) {
            throw new TypeError('Результат неопределен');
        }
        return result;
    } catch (e) {
        console.log(e.message + ', дополнительное сообщение');
    }
}

console.log(evalCalc('2+2'));
console.log(evalCalc('0/0'));
console.log(evalCalc('2+'));