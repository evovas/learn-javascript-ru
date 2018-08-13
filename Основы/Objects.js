var obj = {};
obj.test = 123;
delete obj.test;
console.log(Object.keys(obj) + ' ' + obj.test);

