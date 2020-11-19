// @name 单例模式
// @define 不管new多少次，返回的都是同一个实例
// @eg 模态框
class Modal {
  constructor(selector) {
    this.element = document.createElement('div');
    this.element.innerHTML = (
      `
          用户名 <input name="username"/>
          密码 <input name="password"/>
          <input type="submit" value="登录"/>
        `
    );
    document.body.append(this.element);
  }

  show() {
    this.element.style.display = "block";
  }

  hide() {
    this.element.style.display = "none";
  }

  static getInstance() {
    if (this.instance) {
      return new Modal();
    }
    return this.instance;
  }
}
