/*Для доступа к текущему объекту из метода используется ключевое слово this*/
var user = {
    name: 'Василий',

    sayHi: function() {
        console.log( this.name );
    }
};
//user.sayHi();

/*Если одну и ту же функцию запускать в контексте разных объектов, она будет получать разный this*/
var user2 = {firstName: 'Vasya'};
var admin = {firstName: 'Admin'};

function func() {
    console.log(this.firstName);
}

user2.f = func;
admin.g = func;

// this равен объекту перед точкой:
user2.f(); // Vasya
admin.g(); // Admin
admin['g'](); // Admin (не важно, доступ к объекту через точку или квадратные скобки)

/*Любые другие операции, кроме вызова, превращают Reference Type в обычный тип,
 *в данном случае – функцию go (так уж этот тип устроен).
 */
/*"use strict";
var obj, method;
obj = {
    go: function() { alert(this); }
};
obj.go();            // (1) object
(obj.go)();          // (2) object
(method = obj.go)();      // (3) undefined
(obj.go || obj.stop)(); // (4) undefined*/

var ladder = {
    step: 0,
    up: function() { // вверх по лестнице
        this.step++;
        return this;
    },
    down: function() { // вниз по лестнице
        this.step--;
        return this;
    },
    showStep: function() { // вывести текущую ступеньку
        console.log( this.step );
        return this;
    }
};
ladder.up().up().down().up().down().showStep(); // 1

function sum(a) {

    var currentSum = a;

    function fu(b) {
        currentSum += b;
        return fu;
    }

    fu.valueOf = function() {
        return currentSum;
    };
    fu.toString = function() {
        return currentSum;
    };

    return fu;
}

console.log( global.process.version );
console.log( '' + sum(5)(-1)(2) );
console.log( '' + sum(6)(-1)(-2)(-3) );