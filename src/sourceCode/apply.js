// 模拟apply方法
const myApply = function (ctx, args) {
  // 判断ctx是否存在，否则ctx=window
  if (ctx == null || ctx == undefined) {
    ctx = window;
  }
  const fnSelf = this;
  const SymbolApply = Symbol('apply');
  ctx[SymbolApply] = fnSelf;
  const result = ctx[SymbolApply](...args);
  delete ctx[SymbolApply];
  return result;
};
export default myApply;
// test
console.info('------------------test apply start--------------------');
Function.prototype.myApply = myApply;
const arr = [1, 2, 3];
console.log(Math.max.apply(null, arr)); // [ <20 empty items> ]
console.log(Math.max.myApply(null, arr)); // [ <20 empty items> ]
console.info('------------------test apply end--------------------');
