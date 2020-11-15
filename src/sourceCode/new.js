// 模拟new 方法
function myNew(Func, ...args) {
  try {
    const obj = {};
    Object.setPrototypeOf(obj, Func.prototype);
    const result = Func.apply(obj, args);
    const isObject = (result != null && typeof result === 'object') || typeof result === 'function';
    return isObject ? result : obj;
  } catch (error) {
    throw error;
  }
}
export default myNew;
// test
console.info('------------------test new start--------------------');

function Person(name) {
  this.name = name;
}
Person.prototype.say = function say() {
  return `my name is ${this.name}`;
};
const p = myNew(Person, 'xiaoming');
console.log(p instanceof Person); // true
console.log(p.name); // xiaoming
console.log(p.say()); // my name is xiaoming
console.info('------------------test new end--------------------');
