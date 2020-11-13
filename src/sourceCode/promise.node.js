//三种状态
const [PENDING, FULFILLED, REJECTED] = ["pending", "fulfilled", "rejected"];
//判断一个变量是否可迭代
export const isIterable = obj =>
	obj != null &&
	(typeof obj == "object" || typeof obj == "function") &&
	typeof obj[Symbol.iterator] == "function";
//class MyPromise
export default class MyPromise {
	constructor(execute) {
		if (typeof execute != "function") {
			throw Error("参数必须是一个函数");
		}
		//状态
		this.state = PENDING;
		//值
		this.result = void 0;
		//回调队列
		this.resolvedCbs = [];
		this.rejectedCbs = [];
		//resolve操作
		const resolve = value => {
			if (this.state != PENDING) return;
			this.state = FULFILLED;
			this.result = value;
			process.nextTick(() => {
				this.resolvedCbs.map(cb => cb(value));
			});
		};
		//reject操作
		const reject = reason => {
			if (this.state != PENDING) return;
			this.state = REJECTED;
			this.result = reason;
			//模拟微任务
			process.nextTick(() => {
				this.rejectedCbs.map(cb => cb(reason));
			});
		};
		try {
			execute(resolve, reject);
		} catch (error) {
			//如果报错执行reject
			reject(error);
			throw Error(error);
		}
	}
	//静态resolve函数
	static resolve(param = this.result) {
		if (param instanceof MyPromise) {
			//幂等
			return param;
		}
		return new MyPromise(resolve => {
			resolve(param);
		});
	}
	//静态reject函数,非幂等
	static reject(param = this.result) {
		return new MyPromise((resolve, reject) => {
			reject(param);
		});
	}
	//静态all方法
	static all(params) {
		if (!isIterable(params)) {
			throw Error("参数不可迭代");
		}
		return new MyPromise((resolve, reject) => {
			let itemsMap = new Map();
			//迭代参数的个数
			const len = params.length;
			for (let item of params) {
        console.log(item);
				//非promise转成promise实例
				const promiseItem = item instanceof MyPromise ? item : MyPromise.resolve(item);
				promiseItem.then(
					res => {
            itemsMap.set(item, res);
						itemsMap.size == len && resolve([...itemsMap.values()]);
					},
					err => {
						reject(err);
					}
				);
			}
		});
	}
	//静态方法，竞速
	//返回第一个落定的promise，完成和拒绝状态同等优先级，都没有回调就是pending
	static race(params) {
		if (!isIterable(params)) {
			throw Error("参数不可迭代");
		}
		return new MyPromise((resolve, reject) => {
			//迭代参数的个数
			for (let item of params) {
				//非promise转成promise实例
				const promiseItem = item instanceof MyPromise ? item : MyPromise.resolve(item);
				promiseItem.then(
					res => {
						resolve(res);
					},
					err => {
						reject(err);
					}
				);
			}
		});
	}
	//返回一个new promise
	//如果有第一个参数（onResolved）,将onResolved推进回调队列
	//推进回调队列的有可能是一个promise
	//如果是普通值，则正常return
	//如果是promise，则用返回值的then()方法
	then(onResolved, onRejected) {
		return new MyPromise((resolve, reject) => {
			if (typeof onResolved == "function") {
				this.resolvedCbs.push(() => {
					const result = onResolved(this.result);
					if (result instanceof MyPromise) {
						return result.then(resolve);
					}
					return result;
				});
			}
			if (typeof onRejected == "function") {
				this.rejectedCbs.push(() => {
					const result = onRejected(this.result);
					if (result instanceof MyPromise) {
						return result.then(null, reject);
					}
					return result;
				});
			}
		});
	}
	catch(onRejected) {
		return this.then(null, onRejected);
	}
}
