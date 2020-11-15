class Stack {
  constructor() {
    this._items = [];
  }

  // 添加一个元素到栈顶
  push(element) {
    this._items.push(element);
  }

  // 移除一个元素，并返回该元素
  pop() {
    this._items.pop();
  }

  // 查看栈顶元素
  peek() {
    return this._items[this._items.length - 1];
  }

  // 查看栈是否为空
  isEmpty() {
    return this._items.length == 0;
  }

  // 查看栈的元素个数
  size() {
    return this._items.length;
  }

  // 清空栈
  clear() {
    this._items = [];
  }
}
// > 基于array实现
// > 查找元素的时间复杂度是O(n),n代表数组的长度
