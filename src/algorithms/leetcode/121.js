/**
 * @description 股票买卖 最佳时机
 * @param {*} arr 每天的股票价格
 * @returns {*} 最佳时机的索引
 */
function stock(arr) {
  const res = [0];
  const len = arr.length;
  for (let i = 0; i < len; i++) {
    for (let j = i; j < len; j++) {
      if (res[0] < arr[j] - arr[i]) { res[1] = j; }
    }
  }
  return res[1];
}

// test
const arr = [7, 1, 5, 3, 6, 4];
stock(arr); // 5
