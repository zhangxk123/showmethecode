// 模拟call方法
export default function myCall(ctx, ...args) {
  // 判断ctx是否存在，否则ctx=window
  if (ctx == null || ctx == undefined) {
    ctx = window;
  }
  const fnSelf = this;
  // 使用Symbol可以防止键名冲突
  const SymbolCall = Symbol('call');
  ctx[SymbolCall] = fnSelf;
  const result = ctx[SymbolCall](...args);
  delete ctx[SymbolCall];
  return result;
}
