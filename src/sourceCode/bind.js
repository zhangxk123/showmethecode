// 模拟bind方法
const myBind = function (ctx, ...args) {
  // 判断ctx是否存在，否则ctx=window
  if (ctx == null || ctx == undefined) {
    ctx = window;
  }
  const fnSelf = this;
  // 返回一个指定上下文的新函数
  const newFunc = function (...newArgs) {
    const resArgs = [].concat(args).concat(newArgs);
    // 作为构造函数执行
    const isNew = this instanceof newFunc;
    return isNew ? fnSelf.apply(this, resArgs) : fnSelf.apply(ctx, resArgs);
  };
  newFunc.prototype = Object.create(fnSelf.prototype);
  return newFunc;
};
export default myBind;
// test
console.info('------------------test bind start--------------------');
Function.prototype.myBind = myBind;
const xiaoming = {
  length: 20,
};
const xiaoqiang = {
  length: 100,
};
const getLength = function () {
  return this.length;
};
// 生成一个指定上下文的普通函数，并且参数可以累加
const getLength20 = getLength.bind(xiaoming);
console.log(getLength20()); // 20
// apply和call无法显示改变bind函数的this
console.log(getLength20.call(xiaoqiang)); // 20
// 将bind函数作为构造函数使用
function Person(name, age) {
  this.name = name;
  this.age = age;
}
Person.prototype.say = function () {
  return this.name;
};
Person.prototype.getAge = function () {
  return this.age;
};
const xiaowang = {
  name: '小王',
  age: 20,
  getAge() {
    return this.age;
  },
};
window.name = 'window';
const PersonWang = Person.myBind(xiaowang);
const pw = new PersonWang('小王', 30);
console.log(pw instanceof PersonWang, pw instanceof Person);
console.log(pw.say(), pw.getAge());
console.info('------------------test bind end--------------------');
