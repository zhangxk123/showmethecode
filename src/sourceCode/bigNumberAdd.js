/**
 * @description 超出js安全整数范围的加法实现
 * @export
 * @param {String} a 第一个大整数
 * @param {String} b 第二个大整数
 * @return {String} 参数之和
 */
export default function (a, b) {
  a = a.split("");
  b = b.split("");
  let res = "";
  let temp = false;
  while (a.length || b.length || temp) {
    // eslint-disable-next-line no-bitwise
    temp = temp + ~~a.pop() + ~~b.pop();
    res = (temp % 10) + res;
    temp = temp > 9;
  }
  /** @type {*} */
  return res;
}