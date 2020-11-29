/**
 * @description 模拟Function.bind
 * @export
 * @param {*} 指定this对象
 * @param {ArrayLike} 原函数参数列表
 * @return {Function} 返回一个绑定指定this的新函数
 */
export default function myBind(ctx, ...args) {
  // 非严格模式 this指向window
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
}
