//## 创建
let arr = new Array(10); //[empty*10]
arr = new Array(1, 2, 3, 4, 5, 6); //1-6
arr = [1, 2, 3, 4, 5, 6]; //1-6
arr = Array.from(arr, x => x % 2 == 0); //[false, true, false, true, false, true]
arr = Array.of(10); //[10]
//## 实例属性
Array.prototype.length;
//## 实例方法
//### 查
Array.prototype.keys();
Array.prototype.values();
Array.prototype.entries();
//### 增删改
Array.prototype.push();
Array.prototype.pop();
Array.prototype.unshift();
Array.prototype.shift();
Array.prototype.splice();
Array.prototype.slice();
Array.prototype.join();
//填充
Array.prototype.fill();
Array.prototype.copyWithin();
//### 合并
Array.prototype.concat();
//### 迭代
Array.prototype.forEach();
Array.prototype.map();
Array.prototype.filter();
Array.prototype.every();
Array.prototype.some();
Array.prototype.reduce();
//### 排序
Array.prototype.sort();
Array.prototype.reverse();
//### 搜索
Array.prototype.indexOf();
Array.prototype.lastIndexOf();
Array.prototype.includes();
Array.prototype.find();
Array.prototype.findIndex();
//## 静态方法
Array.isArray();
Array.from();
Array.of();
//## 类数组
//{length:Number,...other}
// arguments
// document.all
