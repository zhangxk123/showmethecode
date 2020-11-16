/* eslint-disable prefer-promise-reject-errors */
import MyPromise from "../../src/sourceCode/promise.node.js";

let startTime = 0;
const p = new MyPromise((resolve) => {
  startTime = Date.now();
  setTimeout(() => {
    resolve(1);
  }, 500);
});
console.log(`p`, p);
p.then((res) => {
  console.log(`${Date.now() - startTime}ms后`, res);
  return new MyPromise((resolve) => {
    console.log(`${Date.now() - startTime}ms后`, res);
    setTimeout(() => {
      resolve(2);
    }, 1000);
  });
}).then((res) => {
  console.log(`${Date.now() - startTime}ms后`, res);
});
const pend = new MyPromise(() => {});
console.log(pend);
pend.then((res) => {
  console.log(`pending down`);
});
const pend2 = pend.then();
console.log(`pend2`, pend2);
console.log(`pend == pend2`, pend == pend2);
const pend3 = MyPromise.resolve(() => {});
console.log(`pend3`, pend3);
const pend4 = MyPromise.resolve(pend);
console.log(`pend4`, pend4);
const pall = MyPromise.all([1, 2, 3]);
console.log(pall);
console.log(`================MyPromise.all==============`);
const p1 = new MyPromise((resolve) => {
  setTimeout(() => {
    resolve(1);
  }, 100);
});
const p2 = MyPromise.resolve(2);
const p3 = new MyPromise(() => {});
const p4 = MyPromise.reject(4);
MyPromise.all([p1, p2]).then((res) => {
  console.log(res); // [2,1]
});
console.log(MyPromise.all([p1, p2, p3])); // pending
MyPromise.all([p1, p2, p4]).then(null, (err) => {
  console.log(err); // 4
});
// console.log(`================MyPromise.race==============`);
// const p1 = Promise.reject(1);
// const p2 = Promise.resolve(2);
// const p3 = new Promise(() => {});
// const p4 = Promise.reject(4);
// MyPromise.race([Promise.reject(1), Promise.resolve(2)]).then(null, (err) => {
//   console.log(err); // 1
// });
