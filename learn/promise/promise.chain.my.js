/* eslint-disable consistent-return */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
/* eslint-disable max-len */
function promiseCreator() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, 1000);
  });
}

function promiseCreator2() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, 2000);
  });
}
function promiseCreator3() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject('失败了');
    }, 3000);
  });
}
const promiseCreatorList = [
  promiseCreator,
  promiseCreator2,
  promiseCreator3,
];
/**
 * @description 实现多个异步函数链式调用
 * @param {*} list 异步函数数组
 * @return {*} promise实例
 */
Promise.chain1 = function (list) {
  return Promise.resolve(list && list.length && list.reduce((a, b) => a.then(b), Promise.resolve()));
};
Promise.chain2 = async function (list) {
  if (list && list.length) {
    let res;
    for (const [i, item] of list.entries()) {
      try {
        res = await item();
        if (i == list.length - 1) {
          return res;
        }
      } catch (error) {
        return Promise.reject(error);
      }
    }
  }
};
// test chain1
console.time("chain1");
Promise.chain1(promiseCreatorList).then(() => {
  console.timeEnd("chain1");
}).catch((error) => {
  console.log('error', error);
  console.timeEnd("chain1");
});
// test chain2
console.time("chain2");
Promise.chain2(promiseCreatorList).then(() => {
  console.timeEnd("chain2");
}).catch((error) => {
  console.log('error', error);
  console.timeEnd("chain2");
});