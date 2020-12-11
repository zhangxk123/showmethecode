/**
 * @description 计数排序(整数排序算法) 时间复杂度O(n+k) k代表临时计数数组的大小
 * @export
 * @param {*} arr
 * @returns {*}
 */
export default function countingSort(arr) {
  if (arr.length < 2) {
    return arr;
  }
  const maxValue = findMaxValue(arr);
  const counts = new Array(maxValue + 1);
  arr.forEach((element) => {
    if (!counts[element]) {
      counts[element] = 0;
    }
    counts[element]++;
  });
  let sortedIndex = 0;
  counts.forEach((count, i) => {
    while (count > 0) {
      arr[sortedIndex++] = i;
      count--;
    }
  });
  return arr;
}

function findMaxValue(arr) {
  return Math.max(...arr);
}