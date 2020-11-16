// 模拟apply方法
export default function myApply(ctx, args) {
  // 判断ctx是否存在，否则ctx=window
  if (ctx == null || ctx == undefined) {
    ctx = window;
  }
  const fnSelf = this;
  // 使用Symbol可以防止键名冲突
  const SymbolApply = Symbol('apply');
  ctx[SymbolApply] = fnSelf;
  const result = ctx[SymbolApply](...args);
  delete ctx[SymbolApply];
  return result;
}
