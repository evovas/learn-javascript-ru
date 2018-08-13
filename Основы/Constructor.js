/* Детальнее – функция, запущенная через new, делает следующее:
1. Создаётся новый пустой объект.
2. Ключевое слово this получает ссылку на этот объект.
3. Функция выполняется. Как правило, она модифицирует this (т.е. этот новый объект), добавляет методы, свойства.
4. Возвращается this.
*/
//Так же объект может содрежать в себе методы, а так же локальные переменные
function User(name) {
    var phrase = 'Моё имя: ';
    this.name = name;

    this.sayHi = function() {
        console.log( phrase + this.name );
    };
}

var ivan = new User("Иван");

ivan.sayHi(); // Моё имя: Иван

/*ЗАДАЧИ LEARN JAVASCRIPT*/
/*Создать SimpleCalculator при помощи конструктора https://learn.javascript.ru/task/calculator-constructor*/
{
    function SimpleCalculator() {
        var a, b;
        this.read = function (num1, num2) {
            a = num1;
            b = num2;
        };
        this.sum = function () {
            return a + b;
        };
        this.mul = function () {
            return a * b;
        };
    }
    console.log();
    console.log('Проверка работы SimpleCalculator');
    var calculator = new SimpleCalculator();
    calculator.read(3, 2);
    console.log("Сумма = " + calculator.sum());
    console.log("Произведение = " + calculator.mul());
}

/*Создать Accumulator при помощи конструктора https://learn.javascript.ru/task/accumulator*/
{
    function Accumulator(startingValue) {
        this.value = startingValue;
        this.read = function (num) {
            this.value += num;
        }
    }

    console.log();
    console.log('Проверка работы Accumulator');
    var accumulator = new Accumulator(1); // начальное значение 1
    accumulator.read(4); // прибавит ввод prompt к текущему значению
    accumulator.read(-1); // прибавит ввод prompt к текущему значению
    console.log( accumulator.value ); // выведет текущее значение
}

/*Создайте калькулятор https://learn.javascript.ru/task/calculator-extendable*/
{
    function Calculator() {
        var operators = ['+', '-'];
        var functions = [function (a, b) {
            return a + b;
        },
        function (a, b) {
            return a - b;
        }];
        this.calculate = function (str) {
            var operandsAndOperator = str.split(' ', 3);
            var a = +operandsAndOperator[0];
            var b = +operandsAndOperator[2];
            var index = operators.indexOf(operandsAndOperator[1]);
            if (index === -1) {
                throw new TypeError('Передан неизвестный оператор')
            }
            return functions[index](a, b);
        };
        this.addMethod = function (name, func) {
            operators.push(name);
            functions.push(func);
        };
    }

    console.log();
    console.log('Проверка работы Calculator');
    var calc = new Calculator();
    console.log(calc.calculate("3 - 7"));

    var powerCalc = new Calculator;
    powerCalc.addMethod("*", function(a, b) {
        return a * b;
    });
    powerCalc.addMethod("/", function(a, b) {
        return a / b;
    });
    powerCalc.addMethod("**", function(a, b) {
        return Math.pow(a, b);
    });

    var result = powerCalc.calculate("2 ** 3");
    console.log(result); // 8
}