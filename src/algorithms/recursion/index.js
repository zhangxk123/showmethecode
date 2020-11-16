/* eslint-disable no-shadow */
/* eslint-disable import/prefer-default-export */
// 递归思想
// 寻找循环调用的规律和基线
// 避免栈溢出
// es6 有尾调用优化,如果函数内操作是调用函数，会通过跳转指令（jump），而不是子程序调用的方式
// 因此es6会一直调用下去

// 计算一个数的阶乘 5!=5*4*3*2*1
// 递归阶乘
// 规律 n*f(n-1)
export function factorial(num) {
  if (num == 1 || num == 0) {
    return 1;
  }
  return num * factorial(num - 1);
}
// 迭代阶乘
export function factorial2(num) {
  let total = 1;
  for (let i = num; i > 1; i--) {
    total *= i;
  }
  return total;
}

// 斐波那契数列[0,1,1,2,3,5,8,13,21...]
// 规律 n=f(n-1)+f(n-2)

// 1.迭代实现
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
// 2. 递归实现
export function fib2(n) {
  if (n < 1) return 0;
  if (n <= 2) return 1;
  return fib2(n - 1) + fib2(n - 2);
}

// 3.记忆化递归(将已经求的值缓存取来，无需重复计算)
export function fib3(n) {
  const memo = [0, 1];
  function fib3inner(n) {
    if (memo[n] != null) return memo[n];
    memo[n] = fib3inner(n - 1) + fib3inner(n - 2);
    return memo[n];
  }
  return fib3inner(n);
}
