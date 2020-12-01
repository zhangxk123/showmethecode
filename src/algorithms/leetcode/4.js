/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
const findMedianSortedArrays = function (nums1, nums2) {
  const len1 = nums1.length;
  const len2 = nums2.length;
  if (len1 && len2) {
    // 交叉
    const arr = nums1.concat(nums2).sort((a, b) => a - b);
    return findMed(arr);
  }
  function findMed(arr) {
    const len = arr.length;
    const inddex = 0;
    if (len % 2 == 0) {
      return (arr[len / 2] + arr[len / 2 - 1]) / 2;
    }
    return arr[Math.floor(len / 2)];
  }
  // 单一数组
  return findMed(nums1.concat(nums2));
};

const arr1 = [1, 3];
const arr2 = [2, 7];
const arr3 = [0, 0, 0];
const arr4 = [-1, 0, 0, 1];
const arr5 = [3];
const arr6 = [-2, -1];
const arr7 = [1, 1];
const arr8 = [1, 2];
console.log(findMedianSortedArrays(arr1, arr2));
console.log(findMedianSortedArrays(arr3, arr4));
console.log(findMedianSortedArrays(arr5, arr6));
console.log(findMedianSortedArrays(arr7, arr8));