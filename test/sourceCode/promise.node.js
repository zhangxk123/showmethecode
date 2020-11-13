import MyPromise from "./../../src/sourceCode/promise.node.js";
// let startTime = 0;
// let p = new MyPromise(resolve => {
// 	startTime = Date.now();
// 	setTimeout(() => {
// 		resolve(1);
// 	}, 500);
// });
// console.log(`p`,p);
// p.then(res => {
// 	console.log(`${Date.now() - startTime}ms后`, res);
// 	return new MyPromise(resolve => {
// 		console.log(`${Date.now() - startTime}ms后`, res);
// 		setTimeout(() => {
// 			resolve(2);
// 		}, 1000);
// 	});
// }).then(res => {
// 	console.log(`${Date.now() - startTime}ms后`, res);
// });
// let pend = new MyPromise(() => {});
// console.log(pend);
// pend.then(res => {
// 	console.log(`pending down`);
// });
// let pend2 = pend.then();
// console.log(`pend2`, pend2);
// console.log(`pend == pend2`, pend == pend2);
// let pend3 = MyPromise.resolve(() => {});
// console.log(`pend3`, pend3);
// let pend4 = MyPromise.resolve(pend);
// console.log(`pend4`, pend4);
// let pall = MyPromise.all([1, 2, 3]);
// console.log(pall);
// console.log(`================MyPromise.all==============`);
let p1 = 1;
let p2 = MyPromise.resolve(2);
let p3 = new MyPromise(() => {});
let p4 = MyPromise.reject(4);
MyPromise.all([p1, p2]).then(
	res => {
		console.log(res);
	},
	err => {
		console.log(`err`, err);
	}
);
// console.log(`===========================================`);
// console.log(`================MyPromise.race==============`);
// let p1 = 1;
// let p2 = MyPromise.resolve(2);
// let p3 = new MyPromise(() => {});
// let p4 = MyPromise.reject(4);
// MyPromise.race([p1, p2, p3, p4]).then(
// 	res => {
// 		console.log(res);
// 	},
// 	err => {
// 		console.log(`err`, err);
// 	}
// );
// console.log(`===========================================`);
