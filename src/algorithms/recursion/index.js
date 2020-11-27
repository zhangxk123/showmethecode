/* eslint-disable no-shadow */
/* eslint-disable import/prefer-default-export */
// 递归思想
// 寻找循环调用的规律和基线
// 避免栈溢出
// es6 有尾调用优化,如果函数内操作是调用函数，会通过跳转指令（jump），而不是子程序调用的方式
// 因此es6会一直调用下去

/**
 * @description 阶乘 递归写法
 * @export
 * @param {*} num
 * @returns {*} 1*2*3*...*num
 */
export function factorial(num) {
  if (num == 1 || num == 0) {
    return 1;
  }
  return num * factorial(num - 1);
}
/**
 * @description 阶乘 循环写法
 * @export
 * @param {*} num
 * @returns {*} 1*2*3*...*num
 */
export function factorial2(num) {
  let total = 1;
  for (let i = num; i > 1; i--) {
    total *= i;
  }
  return total;
}

/**
 * @description  斐波那契数列[0,1,1,2,3,5,8,13,21...]
 * @export
 * @param {*} n 索引
 * @returns {*} 第n个数列的值
 */
export function fib(n) {
  if (n < 1) return 0;
  if (n <= 2) return 1;
  let prev1 = 0;
  let prev2 = 1;
  let next = 1;
  for (let i = 0; i <= n; i++) {
    next = prev1 + prev2;
    prev1 = prev2;
    prev2 = next;
  }
  return next;
}
/**
 * @description  斐波那契数列  递归实现
 * @export
 * @param {*} n 索引
 * @returns {*} 第n个数列的值
 */
export function fib2(n) {
  if (n < 1) return 0;
  if (n <= 2) return 1;
  return fib2(n - 1) + fib2(n - 2);
}

/**
 * @description  斐波那契数列 记忆功能
 * @export
 * @param {*} n 索引
 * @returns {*} 第n个数列的值
 */
export function fib3(n) {
  const memo = [0, 1];
  function fib3inner(n) {
    if (memo[n] != null) return memo[n];
    memo[n] = fib3inner(n - 1) + fib3inner(n - 2);
    return memo[n];
  }
  return fib3inner(n);
}
