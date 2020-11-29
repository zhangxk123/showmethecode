/**
 * @description 防抖
 * @export
 * @param {*} fn 需要防抖的函数
 * @param {number} [ms=1000 / 60] 默认在60帧的渲染的速度，1秒内60次
 * @return {*} 返回一个包装函数，可防抖
 */
export default function debounce(fn, ms = 1000 / 60) {
  let timer = null;
  return function (...args) {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      fn.apply(this, args);
    }, ms);
  };
}
