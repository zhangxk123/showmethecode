//双端队列
export default class Queue {
	constructor() {
		this._count = 0;
		this._lowestCount = 0;
		this._items = {};
	}
	//前端添加元素
	addFront(element) {
		if (this.isEmpty()) {
			this.addBack(element);
			return;
		} else if (this._lowestCount > 0) {
			this._lowestCount--;
			this._items[this._lowestCount] = element;
		} else {
			for (let i = this._count; i > 0; i--) {
				this._items[i] = this._items[i - 1];
			}
			this._count++;
			this._lowestCount = 0;
			this._items[0] = element;
		}
	}
	//后端添加元素
	addBack(element) {
		this._items[this._count] = element;
		this._count++;
	}
	//前端删除元素
	removeFront() {
		if (this.isEmpty()) {
			return void 0;
		}
		const element = this._items[this._lowestCount];
		delete this._items[this._lowestCount];
		this._lowestCount++;
		return element;
	}
	//后端删除元素
	removeBack() {
		if (this.isEmpty()) {
			return void 0;
		}
		this._count--;
		const element = this._items[this._count];
		delete this._items[this._count];
		return element;
	}
	//返回队列的第一个元素
	peekFront() {
		if (this.isEmpty()) {
			return void 0;
		}
		return this._items[this._lowestCount];
	}
	//返回队列的最后一个元素
	peekBack() {
		if (this.isEmpty()) {
			return void 0;
		}
		return this._items[this._count - 1];
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
