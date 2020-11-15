// 手写柯里化
export default function curry(fn, ...args) {
  if (fn.length <= args.length) {
    return fn(...args);
  }
  return curry.bind(null, fn, ...args);
}
// test
console.info('------------------test curry start--------------------');
const sum = function (x, y, z) {
  return x + y + z;
};
const currySum = curry(sum);
console.log(currySum(1, 2, 3)); // 6
console.log(currySum(1, 2)(3)); // 6
console.log(currySum(1)(2, 3)); // 6
console.log(currySum(1)(2)(3)); // 6
console.info('------------------test curry end--------------------');
