/**
 * @description 模拟Function.call方法
 * @export
 * @param {*} ctx 指定this对象
 * @param {Array} args 原函数的参数列表
 * @return {*} 原函数返回值
 */
export default function myCall(ctx, ...args) {
  // 非严格模式，this指向window
  if (ctx == null || ctx == undefined) {
    ctx = window;
  }
  const fnSelf = this;
  // 使用Symbol可以防止键名冲突
  const SymbolCall = Symbol('call');
  ctx[SymbolCall] = fnSelf;
  const res = ctx[SymbolCall](...args);
  delete ctx[SymbolCall];
  return res;
}
