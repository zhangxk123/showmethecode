// eslint-disable-next-line no-shadow
/**
 * @description 数组转树形结构
 * @param {*} arr
 * @returns {*} 树形结构{id,chidlren:[id,children]}
 */
function transfer(arr) {
  let i = 0;
  while (i < arr.length) {
    arr[i].children = arr[++i] ? [arr[++i]] : [];
  }
  return arr[0];
}
