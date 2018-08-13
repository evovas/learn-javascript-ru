setTimeout(function() {
    console.log( "Привет" );
}, 1000);

/*В некоторых случаях контекст функции может быть потерян.
* То есть мы вроде как вызываем метод объекта, а на самом деле он получает this = undefined.
*/

var user = {
    firstName: "Вася",
    sayHi: function() {
        console.log( this.firstName );
    }
};

setTimeout(user.sayHi, 1000); // undefined (не Вася!)

/*Есть несколько способов решения, среди которых мы, в зависимости от ситуации, можем выбирать:
* Решение 1: сделать обёртку
* Решение 2: написать bind для привязки контекста
* Решение 3: использовать встроенный метод bind
*/
//Собственная функция bind
function bind(func, context) {
    return function() {
        return func.apply(context, arguments);
    };
}
//Использование встроенного метода bind
/* var wrapper = func.bind(context[, arg1, arg2...]) */

//Три равнозначных вызова функции
//Решение 1
setTimeout(function() {
    user.sayHi(); // Вася
}, 1000);
//Решение 2
setTimeout(bind(user.sayHi, user), 1000);
//Решение 3
setTimeout(user.sayHi.bind(user), 1000);

/*Карринг
* Карринг (currying) или каррирование – термин функционального программирования,
* который означает создание новой функции путём фиксирования аргументов существующей.
*/

function mul(a, b) {
    return a * b;
}
var double = mul.bind(null, 2);
//Говорят, что double является «частичной функцией» (partial function) от mul.
console.log(double(3)); // 6

/*ЗАДАЧИ LEARN JAVASCRIPT*/
/*Использование функции вопросов https://learn.javascript.ru/task/question-use-bind*/
//"use strict"; //Закомментироано из-за вызова ошибки
{


    function ask(question, answer, ok, fail) {
        var result = '12345';
        if (result.toLowerCase() == answer.toLowerCase()) ok();
        else fail();
    }

    var userExercise1 = {
        login: 'Василий',
        password: '12345',

        loginOk: function () {
            console.log(this.login + ' вошёл в сайт');
        },

        loginFail: function () {
            console.log(this.login + ': ошибка входа');
        },

        checkPassword: function () {
            ask("Ваш пароль?", this.password, this.loginOk.bind(this), this.loginFail.bind(this));
        }
    };

    var vasya = userExercise1;
    userExercise1 = null;
    vasya.checkPassword();
}

/*Использование функции вопросов с каррингом https://learn.javascript.ru/task/ask-currying*/

var userExercise2 = {
    login: 'Петр',
    password: '123456',

    // метод для вызова из ask
    loginDone: function(result) {
        console.log( this.login + (result ? ' вошёл в сайт' : ' ошибка входа') );
    },
    /* Variant 1 */
    checkPassword: function() {
        var self = this;
        ask("Ваш пароль?", this.password,
            function() {
                self.loginDone(true);
            },
            function() {
                self.loginDone(false);
            }
        );
    }

    /* Variant 2
    checkPassword: function() {
        ask("Ваш пароль?", this.password, this.loginDone.bind(this, true), this.loginDone.bind(this, false));
    }
    */
};

var petya = userExercise2;
userExercise2 = null;
petya.checkPassword();



