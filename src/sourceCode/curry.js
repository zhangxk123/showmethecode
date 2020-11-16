// 手写柯里化
export default function curry(fn, ...args) {
  if (fn.length <= args.length) {
    return fn(...args);
  }
  return curry.bind(null, fn, ...args);
}
