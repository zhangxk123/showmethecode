/**
 * @description 生成正序数组
 * @export
 * @param {number} [len=10] 默认长度为10
 * @return {*} 正序数组
 */
export function sortedArray(len = 10) {
  return Array.from(new Array(len), (x, i) => i + 1);
}
/**
 * @description 生成倒序数组
 * @export
 * @param {number} [len=10] 默认长度为10
 * @return {*} 倒序数组
 */
export function reverseArray(len = 10) {
  return sortedArray(len).reverse();
}
/**
 * @description 生成 随机数组
 * @export
 * @param {number} [len=10] 数组长度 默认10
 * @param {number} [start=1] 数组首位元素 默认1
 * @param {number} [end=10] 数组末尾元素 默认10
 * @return {*}
 */
export function randomArray(len = 10, start = 1, end = 10) {
  const result = [];
  const range = end - start + 1;
  for (let i = 0; i < len; i++) {
    result.push(Math.floor(Math.random() * range + start));
  }
  return result;
}
/**
 * @description 数组去重
 * @export
 * @param {Array} arr 数组
 * @return {Array} 已去重数组
 */
export function unionArray(arr) {
  return [...new Set(arr)];
}
