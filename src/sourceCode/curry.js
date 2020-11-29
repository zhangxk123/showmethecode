/**
 * @description 实现函数柯里化，利用闭包
 * @export
 * @param {Function} fn 原函数
 * @param {Array} args 除一个参数以外的参数数组
 * @return {*} 函数或者结果值
 */
export default function curry(fn, ...args) {
  if (fn.length <= args.length) {
    return fn(...args);
  }
  return curry.bind(null, fn, ...args);
}
