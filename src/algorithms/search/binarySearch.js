// 二分搜索
// 前提是已排序数组

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