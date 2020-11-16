// 模拟new 方法
export default function myNew(Func, ...args) {
  const obj = {};
  Object.setPrototypeOf(obj, Func.prototype);
  const result = Func.apply(obj, args);
  const isObject = (result != null && typeof result === 'object') || typeof result === 'function';
  return isObject ? result : obj;
}