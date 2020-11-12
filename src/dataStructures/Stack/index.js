//栈
//后进先出LIFO
export default class Stack {
	constructor() {
		this._count = 0;
		this._items = {};
	}
	//添加一个元素到栈顶
	push(element) {
		this._items[this._count] = element;
		this._count++;
	}
	//移除一个元素，并返回该元素
	pop() {
		if (this.isEmpty()) {
			return void 0;
		}
		this._count--;
		const element = this._items[this._count];
		delete this._items[this._count];
		return element;
	}
	//查看栈顶元素
	peek() {
		if (this.isEmpty()) {
			return void 0;
		}
		return this._items[this._count - 1];
	}
	//查看栈是否为空
	isEmpty() {
		return this._count === 0;
	}
	//查看栈的元素个数
	size() {
		return this._count;
	}
	//清空栈
	clear() {
		this._items = {};
		this._count = 0;
	}
}
//> 基于object实现
//> 方法的时间复杂度是O(1)
