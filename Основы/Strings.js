/*splice извлекает часть строки и возвращает новую строку.
indexOf возвращает индекс первого вхождения указанного значения.
toLowerCase Приведение строки к нижнему регистру.
trim Удалить пробельные символы с начала и с конца строки.
startsWith Проверяет, начинается ли строка с заданной подстроки.
*/

var str  = '123456789AaaA';
tempStr1 = str.slice(2,5);
tempStr2 = str.toLocaleLowerCase();
console.log(tempStr1);
console.log(tempStr2);
console.log(str);
a = '';
console.log(a === '');