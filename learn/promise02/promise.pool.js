const { createPromise, logTime } = require("./utils");
/**
 * @description 异步函数并发
 * @class PoolAsync
 */
class PoolAsync {
	constructor(queue = [], limit = 2) {
		this.queue = queue;
		this.limit = limit;
		this.len = 0;
		this.init();
	}
	/**
	 * @description 将原异步队列做一个包装，使其返回index参数用于判断resolve时机
	 * @memberof PoolAsync
	 */
	init() {
		this.queue = this.queue.map((c, index) => {
			this.len++;
			return () => {
				return new Promise((resolve, reject) => {
					c().then(() => {
						resolve(index);
					});
				});
			};
		});
		return this;
	}
	run() {
		return new Promise((resolve, reject) => {
      // 如果并发量大于等于队列个数 使用all并发
			let first = this.queue.splice(0, this.limit).map(c => c());
			if (first.length == this.len) {
				Promise.all(first).then(d => {
					resolve();
				});
				return;
      }
      // 否则race并发
			this.queue.reduce((a, b, index, self) => {
				return a.then(() => {
					if (self.length) {
						let next = self.splice(0, 1).map(c => c());
						return Promise.race(next).then(d => {
							if (d == this.len - 1) {
								resolve();
							}
						});
					}
				});
			}, Promise.race(first));
		});
	}
}

//test
let list = Array.from(new Array(6), (item, index) => createPromise(++index));
logTime();
let pool = new PoolAsync(list, 6);
pool.run().then(d => {
	console.log("成功");
});
