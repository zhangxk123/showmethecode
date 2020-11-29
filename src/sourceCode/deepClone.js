/**
 * @description 深拷贝
 * @export
 * @param {*} obj 深拷贝的对象
 * @param {*} [cache=new WeakMap()] 缓存对象，解决循环引用，利用WeakMap的弱引用防止内存溢出
 * @return {*}
 */
export default function deepClone(obj, cache = new WeakMap()) {
  // 原始值
  if (!(obj instanceof Object)) {
    return obj;
  }
  // 防止循环引用
  if (cache.get(obj)) return cache.get(obj);
  // 函数
  if (typeof obj === 'function') {
    return function () {
      // eslint-disable-next-line prefer-rest-params
      return obj.apply(arguments);
    };
  }
  // 日期
  if (obj instanceof Date) {
    return new Date(obj);
  }
  // 正则
  if (obj instanceof RegExp) {
    return new RegExp(obj.source, obj.flags);
  }
  let cloneTarget = Object.create(null);
  cache.set(obj, cloneTarget);
  // set
  if (obj instanceof Set) {
    cloneTarget = new Set();
    obj.forEach((item) => cloneTarget.add(deepClone(item, cache)));
    return cloneTarget;
  }
  // map
  if (obj instanceof Map) {
    cloneTarget = new Map();
    obj.forEach((item, key) => cloneTarget.set(key, deepClone(item, cache)));
    return cloneTarget;
  }
  // 对象或者数组
  cloneTarget = Array.isArray(obj) ? [] : {};
  Object.keys(obj).forEach((key) => {
    cloneTarget[key] = deepClone(obj[key], cache);
  });
  return cloneTarget;
}