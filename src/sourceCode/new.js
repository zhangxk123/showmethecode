/**
 * @description 模拟new 操作符
 * @export
 * @param {Function} Func 构造函数
 * @param {*} args 参数
 * @return {*} 实例或者原构造函数结果
 */
export default function myNew(Func, ...args) {
  const obj = {};
  Object.setPrototypeOf(obj, Func.prototype);
  const result = Func.apply(obj, args);
  const isObject = (result != null && typeof result === 'object') || typeof result === 'function';
  return isObject ? result : obj;
}