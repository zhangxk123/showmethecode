/**
 * @description 模拟Function.apply方法
 * @export
 * @param {*} ctx 指定this对象
 * @param {Array} args 原函数的参数数组
 * @return {*} 原函数返回值
 */
export default function myApply(ctx, args) {
  // 非严格模式，this指向window
  if (ctx == null || ctx == undefined) {
    ctx = window;
  }
  const fnSelf = this;
  // 使用Symbol可以防止键名冲突
  const SymbolApply = Symbol('apply');
  ctx[SymbolApply] = fnSelf;
  const res = ctx[SymbolApply](...args);
  delete ctx[SymbolApply];
  return res;
}
