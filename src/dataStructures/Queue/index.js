//队列
//先进先出FIFO
export default class Queue {
	constructor() {
		this._count = 0;
		this._lowestCount = 0;
		this._items = {};
	}
	//向队列添加方法(只能加末尾)
	enqueue(element) {
		this._items[this._count] = element;
		this._count++;
	}
	//从队列移除（移除队列首位元素）
	dequeue() {
		if (this.isEmpty()) {
			return void 0;
		}
		const element = this._items[this._lowestCount];
		delete this._items[this._lowestCount];
		this._lowestCount++;
		return element;
	}
	//返回队列的第一个元素
	peek() {
		if (this.isEmpty()) {
			return void 0;
		}
		return this._items[this._lowestCount];
	}
	//返回队列的元素个数
	size() {
		if (this.isEmpty()) {
			return void 0;
		}
		return this._count - this._lowestCount;
	}
	//是否为空队列
	isEmpty() {
		return this._count - this._lowestCount === 0;
	}
	//清空队列
	clear() {
		this._count = 0;
		this._lowestCount = 0;
		this._items = {};
	}
}
