// 生成正序的数组
export function sortedArray(len = 10) {
  return Array.from(new Array(len), (x, i) => i + 1);
}
// 生成倒序的数组
export function reverseArray(len = 10) {
  return sortedArray(len).reverse();
}
// 生成 随机数组(10){1,10}
export function randomArray(len = 10, start = 1, end = 10) {
  const result = [];
  const range = end - start + 1;
  for (let i = 0; i < len; i++) {
    result.push(Math.floor(Math.random() * range + start));
  }
  return result;
}
// 数组去重
export function unionArray(arr) {
  return [...new Set(arr)];
}
