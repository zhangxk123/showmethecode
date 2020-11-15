// 节流
// 规定一个单位时间， 在这个单位时间内， 只能有一次触发事件的回调函数执行，
// 如果在同一个单位时间内某事件被触发多次， 只有一次能生效
export default function throttle(fn, ms = 1000 / 60) {
  let canuse = true;
  return function (...args) {
    if (!canuse) {
      return;
    }
    canuse = false;
    fn.apply(this, args);
    setTimeout(() => {
      canuse = true;
    }, ms);
  };
}
console.info('------------------test throttle start--------------------');
function getScrollTop(e) {
  console.log(window.pageYOffset);
}
document.body.style.height = '200vh';
window.addEventListener('scroll', throttle(getScrollTop, 100));
console.info('------------------test throttle end--------------------');
