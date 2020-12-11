// 复杂度O(n^(1-2))
// 数组元素少时，性能优于冒泡和选择排序
/**
 * @description 插入排序
 * @export
 * @param {*} arr
 * @returns {*}
 */
export default function insertionSort(arr) {
  const { length } = arr;
  let temp;
  for (let i = 0; i < length; i++) {
    let j = i;
    temp = arr[i];
    while (j > 0 && arr[j - 1] > temp) {
      arr[j] = arr[j - 1];
      j--;
    }
    arr[j] = temp;
  }
  return arr;
}