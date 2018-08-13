/* Object.defineProperty(obj, prop, descriptor)

obj - Объект, в котором объявляется свойство.
prop - Имя свойства, которое нужно объявить или модифицировать.
descriptor - Дескриптор – объект, который описывает поведение свойства.

В нём могут быть следующие поля:

value – значение свойства, по умолчанию undefined
writable – значение свойства можно менять, если true. По умолчанию false.
configurable – если true, то свойство можно удалять, а также менять его в дальнейшем при помощи новых вызовов defineProperty. По умолчанию false.
enumerable – если true, то свойство просматривается в цикле for..in и методе Object.keys(). По умолчанию false.
get – функция, которая возвращает значение свойства. По умолчанию undefined.
set – функция, которая записывает значение свойства. По умолчанию undefined.
 */


//Примеры кода
"use strict";
{
    var user = {
        name: 'Василий',
        surname: 'Иванов',
        age: 23,
        toString: function () {
            return this.name + ' ' + this.surname + ' ' + this.age + ' года';
        },

        get fullName() {
            return this.name + ' ' + this.surname;
        },
        set fullName(value) {
            var split = value.split(' ');
            this.name = split[0];
            this.surname = split[1];
        }
    };


// Создадим свойство-константа
    Object.defineProperty(user, 'isHuman', {
        value: true,
        writable: false, // запретить присвоение "user.isHuman = ..."
        configurable: false // запретить удаление "delete user.isHuman"
    });

// "Скроем" свойство toString
    Object.defineProperty(user, "toString", {enumerable: false});

    console.log('' + user);
    console.log(user.fullName);
    user.fullName = 'Аркадий Сидоров';
    console.log('' + user);
}

/*Другие методы работы со свойствами
* Object.defineProperties(obj, descriptors) - Позволяет объявить несколько свойств сразу
* Object.keys(obj), Object.getOwnPropertyNames(obj) - Возвращают массив – список свойств объекта.
   Object.keys - возвращает только enumerable-свойства.
   Object.getOwnPropertyNames – возвращает все:
* Object.getOwnPropertyDescriptor(obj, prop) - Возвращает дескриптор для свойства obj[prop].
   Полученный дескриптор можно изменить и использовать defineProperty для сохранения изменений.

  Редкоиспользуемые методы:
* Object.preventExtensions(obj) - Запрещает добавление свойств в объект.
* Object.seal(obj) - Запрещает добавление и удаление свойств, все текущие свойства делает configurable: false.
* Object.freeze(obj) - Запрещает добавление, удаление и изменение свойств, все текущие свойства делает configurable: false, writable: false.
* Object.isExtensible(obj) - Возвращает false, если добавление свойств объекта было запрещено вызовом метода Object.preventExtensions.
* Object.isSealed(obj) - Возвращает true, если добавление и удаление свойств объекта запрещено,
   и все текущие свойства являются configurable: false.
* Object.isFrozen(obj) - Возвращает true, если добавление, удаление и изменение свойств объекта запрещено,
   и все текущие свойства являются configurable: false, writable: false.
*/

/*ЗАДАЧИ LEARN JAVASCRIPT*/
/*Добавить get/set-свойства https://learn.javascript.ru/task/replace-property-getter*/
function User(fullName) {
    this.fullName = fullName;
    Object.defineProperties(this, {
        firstName: {
            get: function () {
                return this.fullName.split(' ')[0];
            },
            set: function (value) {
                this.fullName = value + ' ' + this.lastName;
            }
        },
        lastName: {
            get: function () {
                return this.fullName.split(' ')[1];
            },
            set: function (value) {
                this.fullName = this.firstName + ' ' + value;
            }
        }
    });
}

console.log();
console.log('Проверка работы задачи');
var vasya = new User("Василий Попкин");

// чтение firstName/lastName
console.log( vasya.firstName ); // Василий
console.log( vasya.lastName ); // Попкин

// запись в lastName
vasya.lastName = 'Сидоров';

console.log( vasya.fullName ); // Василий Сидоров

// запись в firstName
vasya.firstName = 'Пётр';
console.log( vasya.fullName ); // Пётр Сидоров

