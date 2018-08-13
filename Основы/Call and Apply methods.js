/* func.call(context, arg1, arg2, ...)
   При этом вызывается функция func, первый аргумент call становится её this, а остальные передаются «как есть».

   Вызов func.call(context, a, b...) – то же, что обычный вызов func(a, b...), но с явно указанным this(=context).
*/
{
    var user = {
        firstName: "Василий",
        surname: "Петров",
        patronym: "Иванович"
    };

    function showFullName(firstPart, lastPart) {
        console.log(this[firstPart] + " " + this[lastPart]);
    }

// f.call(контекст, аргумент1, аргумент2, ...)
    showFullName.call(user, 'firstName', 'surname'); // "Василий Петров"
    showFullName.call(user, 'firstName', 'patronym'); // "Василий Иванович"
}

/* [].slice.call(arguments) */
{
    function printArgs() {
        // вызов arr.slice() скопирует все элементы из this в новый массив
        var args = [].slice.call(arguments);
        console.log(args.join(', ')); // args - полноценный массив из аргументов
    }

    printArgs('Привет', 'мой', 'мир'); // Привет, мой, мир
}

/* func.apply(context, [arg1, arg2])
   // идентичен вызову
   func.call(context, arg1, arg2), но принимает массив аргументов вместо списка.
*/
{
    var arr = [];
    arr.push(1);
    arr.push(5);
    arr.push(2);

// получить максимум из элементов arr
    console.log(Math.max.apply(null, arr)); // 5
}

/*ЗАДАЧИ LEARN JAVASCRIPT*/
/*Перепишите суммирование аргументов https://learn.javascript.ru/task/rewrite-sum-arguments*/
{
    function sumArgs() {
        return [].reduce.call(arguments, function (a, b) {
            return a + b;
        });
    }
    console.log();
    console.log('Проверка работы задачи 1');
    console.log(sumArgs(1, -2, 3));
}

/*Примените функцию к аргументам https://learn.javascript.ru/task/apply-function-skip-first-argument*/
{
    function applyAll(func) {
        var args = [].slice.call(arguments, 1);
        return func.apply(this, args);
    }

    console.log();
    console.log('Проверка работы задачи 2');
    console.log(applyAll(Math.max, 2, -2, 3));

    function mul() { // перемножает аргументы: mul(2,3,4) = 24
        return [].reduce.call(arguments, function (a, b) {
            return a * b;
        });
    }
    console.log(applyAll(mul, 2, 3, 4));
}

