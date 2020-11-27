/**
 * @description 二分查找
 * @export
 * @param {*} arr 有序数组
 * @param {*} target 被查找元素
 * @returns {*} -1或者元素索引
 */
export default function binarySearch(arr, target) {
  let low = 0;
  let high = arr.length - 1;
  while (low <= high) {
    const mid = Math.floor((high + low) / 2);
    const element = arr[mid];
    if (element < target) {
      low = mid + 1;
    } else if (element > target) {
      high = mid - 1;
    } else {
      return mid;
    }
  }
  return -1;
}