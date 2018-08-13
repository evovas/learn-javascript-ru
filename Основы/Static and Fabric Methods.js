/*Примеры статических и простых методов*/
{
    function Journal(date) {
        this.date = date;

        this.getTitle = function () {
            return "Выпуск от " + Journal.formatDate(this.date);
        };
    }

    Journal.formatDate = function (date) {
        return date.getDate() + '.' + (date.getMonth() + 1) + '.' + date.getFullYear();
    };

//Статический метод можно использовать без создания инстанса
    console.log(Journal.formatDate(new Date));

//При создании инстанса пожно использовать простые методы внутри объекта, которые могут использовать статические
    var journal1 = new Journal(new Date);
    console.log(journal1.getTitle());
}

/*"Фабричный статический метод" – удобная альтернатива полиморфному конструктору.
* Так называется статический метод, который служит для создания новых объектов (поэтому и называется «фабричным»).
*/
{
    function User() {
        this.sayHi = function () {
            console.log(this.name)
        };
    }

//Создание инстанса User без аргументов
    User.createAnonymous = function () {
        var user = new User();
        user.name = 'Anonymous';
        return user;
    };

//Создание инстанса User с аргументом в виде объекта
    User.createFromData = function (userData) {
        var user = new User();
        user.name = userData.name;
        user.age = userData.age;
        return user;
    };

// Использование

    var guest = User.createAnonymous();
    guest.sayHi(); // Anonymous

    var knownUser = User.createFromData({
        name: 'Вася',
        age: 25
    });
    knownUser.sayHi(); // Вася
}
/*Полиморфные конструкторы лучше использовать там, где нужен именно полиморфизм,
* т.е. когда непонятно, какого типа аргумент передадут, и хочется в одном конструкторе охватить все варианты.
*/

/*ЗАДАЧИ LEARN JAVASCRIPT*/
/*Счетчик объектов https://learn.javascript.ru/task/objects-counter*/
{
    function Article() {
        this.created = new Date();
        Article.count++;
        Article.lastDate = this.created;
    }

//Создадим статический метод для вывода статистики
    Article.showStats = function () {
        console.log('Всего: ' + this.count + ', Последняя: ' + this.lastDate)
    };

//Добавим подсчет общего колличества созданных объектов
    Article.count = 0;

//Добавим запоминание даты последнего создания объекта
    Article.lastDate = 'Статей еще не было';

    new Article();
    new Article();

    Article.showStats(); // Всего: 2, Последняя: (дата)

    new Article();

    Article.showStats(); // Всего: 3, Последняя: (дата)
}
