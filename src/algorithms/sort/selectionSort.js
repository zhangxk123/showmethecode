// 选择排序
// 复杂度O(n^2)

// 实现
export default function selectionSort(arr) {
  const { length } = arr;
  let indexMin;
  for (let i = 0; i < length - 1; i++) {
    indexMin = i;
    for (let j = i; j < length; j++) {
      if (arr[indexMin] > arr[j]) {
        indexMin = j;
      }
    }
    if (i != indexMin) {
      swap(arr, i, indexMin);
    }
  }
  return arr;
}

// 交换函数
function swap(array, a, b) {
  [array[a], array[b]] = [array[b], array[a]];
}