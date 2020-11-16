// 模拟bind方法
export default function myBind(ctx, ...args) {
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
}
