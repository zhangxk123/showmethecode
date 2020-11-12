export default function MyPromise(execute) {
	if (typeof execute != "function") {
		throw Error("参数必须是一个函数");
	}
	//三种状态
	const [PENDING, FULFILLED, REJECTED] = ["pending", "fulfilled", "rejected"];
	//状态
	this.state = PENDING;
	//回调队列
	this.resolvedCbs = [];
	this.rejectedCbs = [];
	//resolve操作
	const resolve = value => {
		if (this.state != PENDING) return;
		this.state = FULFILLED;
		this.result = value;
		this.resolvedCbs.map(cb => cb(this.result));
	};
	//reject操作
	const reject = reason => {
		if (this.state != PENDING) return;
		this.state = REJECTED;
		this.result = reason;
		this.rejectedCbs.map(cb => cb(this.result));
	};
	try {
		execute(resolve, reject);
	} catch (error) {
		//如果报错执行reject
		reject(error);
		throw Error(error);
	}
}
//返回一个new promise
//如果有第一个参数（onResolved）,将onResolved推进回调队列
//推进回调队列的有可能是一个promise
//如果是普通值，则正常return
//如果是promise，则用返回值的then()方法
MyPromise.prototype.then = function (onResolved, onRejected) {
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
			this.rejectedCbs.push(onRejected);
		}
	});
};
//test
console.info("------------------test promise start--------------------");
let p = new MyPromise(resolve => {
	setTimeout(() => {
		resolve(1);
	}, 500);
});
console.log(p);
p.then(res => {
	console.log(res);
	return new MyPromise(resolve => {
		setTimeout(() => {
			resolve(2);
		}, 500);
	});
}).then(console.log);
console.info("------------------test promise end--------------------");
