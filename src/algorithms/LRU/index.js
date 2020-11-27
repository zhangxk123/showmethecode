/**
 * @description 最近最少使用 算法
 * @class LRU
 */
class LRU {
  constructor(range) {
    this.range = range;
    this.items = new Map();
  }

  /**
   * @description 使用Map 键值对有序的特性，删除第一条
   * @param {*} key
   * @param {*} value
   * @returns {*}
   * @memberof LRU
   */
  put(key, value) {
    if (this.items.get(key)) {
      return;
    }
    if (this.range == this.items.size) {
      // map键值对是有序的
      const old = this.items.keys().next().value;
      this.items.delete(old);
    }
    this.items.set(key, value);
  }

  /**
   * @description 模拟堆栈特性，将最近使用的key移动到栈顶
   * @param {*} key
   * @returns {*}
   * @memberof LRU
   */
  get(key) {
    if (!this.items.get(key)) {
      return -1;
    }
    const val = this.items.get(key);
    this.items.set(key, val);
    this.items.delete(key);
    return this.items.get(key);
  }
}