// @name 工厂模式
// @define 隐藏new的过程，可内部定制实例
// @eg jq的$
class JQuery {
  constructor(selector) {
    const elements = Array.from(document.querySelectorAll(selector));
    const length = elements ? elements.length : 0;
    for (let i = 0; i < length; i++) {
      this[i] = elements[i];
    }
    this.length = length;
  }
}

window.$ = function (selector) {
  return new JQuery(selector);
};
