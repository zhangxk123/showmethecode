// 模拟大整数相加
// @a {String} 大整数字符串（超出安全整数范围的数字）
// @b {String} 大整数字符串（超出安全整数范围的数字）
export default function sumBigInt(a, b) {
  let res = "";
  let temp = 0; // 缓存变量
  while (a.length || b.length || temp) {
    // eslint-disable-next-line no-bitwise
    temp += ~~a.pop() + ~~b.pop(); // ~~ 取整 不合法即为0
    res = (temp % 10) + res; // 取余并累加字符串
    temp = temp > 9; // 模拟逢十进一 true在做加法运算时会转为1
  }
  return res.replace(/^0+/, "");
}
