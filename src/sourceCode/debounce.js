// 防抖
// 在事件被触发 n 秒后再执行回调， 如果在这 n 秒内事件又被触发， 则重新计时。
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
