/**
 * @description 冒泡排序
 * @export
 * @param {*} arr
 * @returns {*}
 */
export function bubbleSort1(arr) {
  const { length } = arr;
  for (let i = 0; i < length - 1; i++) {
    for (let j = 0; j < length - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        swap(arr, j, j + 1);
      }
    }
  }
  return arr;
}

// 实现2
// 内循环减去外循环中已跑过的轮数
export default function bubbleSort(arr) {
  const { length } = arr;
  for (let i = 0; i < length - 1; i++) {
    for (let j = 0; j < length - 1 - i; j++) {
      if (arr[j] > arr[j + 1]) {
        swap(arr, j, j + 1);
      }
    }
  }
  return arr;
}

// 交换函数
function swap(array, a, b) {
  [array[a], array[b]] = [array[b], array[a]];
}
