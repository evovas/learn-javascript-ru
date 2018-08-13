//Методы every() и some() (для проверки массива)
// even - четный, odd - нечетный
//Создадим функцию (callback) проверяющую элемент массива на четность
function isEven(element, index, array) {
    return !(element % 2);
}
//Создадим массивы на которых проверим методы
var evenNumbers = [2, 4, 6, 8];
var oddNumbers = [1, 3, 5, 7];
var numbers = [1, 2, 3, 4, 5];
var emptyArray = [];

//Метод every()
evenNumbers.every(isEven); // true
oddNumbers.every(isEven); // false
numbers.every(isEven); // false
emptyArray.every(isEven); // true (бессодержательная истина (vacuously true))

//Метод some()
evenNumbers.some(isEven); // true
oddNumbers.some(isEven); // false
numbers.some(isEven); // true
emptyArray.some(isEven); // false
// Функция callback вызывается только для индексов массива, имеющих присвоенные значения;
// она не вызывается для индексов, которые были удалены или которым значения никогда не присваивались.



//Метод filter() используется для фильтрации массива через функцию
//Он создаёт новый массив, в который войдут только те элементы для которых вызов callback вернет true

//Создадим массив чисел
var arrayOfNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
//Для проверки работы метода будем использовать функцию проверки на четность описанную выше
var oddNumberAfterFilter = arrayOfNumbers.filter(isEven);
arrayOfNumbers.filter(isEven); // [ 2, 4, 6, 8 ]
oddNumberAfterFilter; // [ 2, 4, 6, 8 ]



//Метод forEach() выполняет функцию callback один раз для каждого элемента массива;
// в отличие от методов every() и some(), он всегда возвращает значение undefined.

//Будем работать с массивом чисел созданным выше (arrayOfNumbers)
var arrayAfterForEach = [];
//Создадим функцию (callback) умножающую число на два и добавляющая его в заданный массив
function multiplicationBy2(value, index, array) {
    arrayAfterForEach.push(value * 2);
}
arrayOfNumbers.forEach(multiplicationBy2); // undefined
arrayAfterForEach; // [ 2, 4, 6, 8, 10, 12, 14, 16, 18 ]



//Метод map() используется для трансформации массива
//Он создаёт новый массив, который будет состоять из результатов вызова (return'ов) callback для каждого переданного элемента

//Для проверки работы метода создадим функцию callback которая будет умножать число на три и применим ее к массиву чисел
function multiplicationBy3(value, index, array) {
    return value * 3;
}
var arrayAfterMap = arrayOfNumbers.map(multiplicationBy3);
arrayOfNumbers.map(multiplicationBy3); // [ 3, 6, 9, 12, 15, 18, 21, 24, 27 ]
arrayAfterMap; // [ 3, 6, 9, 12, 15, 18, 21, 24, 27 ]



//Методы reduce() и reduceRight() (для последовательной обработки каждого элемента массива с сохранением промежуточного результата)
//Аргументы функции callback(previousValue, currentItem, index, arr)
//Кроме callback, методу можно передать «начальное значение» – аргумент initialValue.
// Если он есть, то на первом вызове значение previousValue будет равно initialValue, а если у reduce нет второго аргумента,
// то оно равно первому элементу массива, а перебор начинается со второго.

//Напишем callback для reduce() который считает сумму элементов массива
//(Здесь используем только два аргумента функции callback, так как в других нет нужды)
function sumForReduce(sum, value) {
    return sum + value;
}
//Найдем сумму элементов массива (без использования initialValue)
var sum = arrayOfNumbers.reduce(sumForReduce);
//Найдем сумму элементов массива дополнительно добавив 10 (с использованием initialValue)
var sumWith10 = arrayOfNumbers.reduce(sumForReduce, 10);
sum; // 45
sumWith10; // 55

//Метод reduceRight() аналогичен reduce() только идёт по массиву справа-налево



//Методы которые возвращают массив можно использовать в виде цепочки
//К примеру отфильтруем из массива чисел четные, затем каждое полученное число умножим на три, а после найдем сумму результата
arrayOfNumbers.filter(isEven); // [ 2, 4, 6, 8 ]
arrayOfNumbers.filter(isEven).map(multiplicationBy3); // [ 6, 12, 18, 24 ]
arrayOfNumbers.filter(isEven).map(multiplicationBy3).reduce(sumForReduce); // 60
