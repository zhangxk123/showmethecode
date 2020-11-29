/* eslint-disable no-restricted-syntax */
/* eslint-disable no-loop-func */

const [PENDING, FULFILLED, REJECTED] = ["pending", "fulfilled", "rejected"];
/**
 * @description 模拟Promise类
 * @export
 * @class MyPromise
 */
export default class MyPromise {
  constructor(execute) {
    if (typeof execute !== "function") {
      throw Error("参数必须是一个函数");
    }
    // 状态
    this.state = PENDING;
    // 值
    this.result = undefined;
    // 回调队列
    this.resolvedCbs = [];
    this.rejectedCbs = [];
    // resolve操作
    const resolve = (value) => {
      if (this.state != PENDING) return;
      this.state = FULFILLED;
      this.result = value;
      setTimeout(() => {
        this.resolvedCbs.map((cb) => cb(value));
      }, 0);
    };
    // reject操作
    const reject = (reason) => {
      if (this.state != PENDING) return;
      this.state = REJECTED;
      this.result = reason;
      // 模拟微任务
      setTimeout(() => {
        this.rejectedCbs.map((cb) => cb(reason));
      }, 0);
    };
    try {
      execute(resolve, reject);
    } catch (error) {
      // 如果报错执行reject
      reject(error);
      throw Error(error);
    }
  }

  /**
   * @description 模拟Promise.resolve
   * @static
   * @param {*} param
   * @return {*} 返回一个实例对象
   * @memberof MyPromise
   */
  static resolve(param) {
    if (param instanceof MyPromise) {
      // 幂等
      return param;
    }
    return new MyPromise((resolve) => {
      resolve(param);
    });
  }

  /**
   * @description 模拟Promise.reject
   * @static
   * @param {*} param
   * @return {*} 返回一个实例对象
   * @memberof MyPromise
   */
  static reject(param) {
    return new MyPromise((resolve, reject) => {
      reject(param);
    });
  }

  /**
   * @description 模拟Promise.all
   * @static
   * @param {*} iterable 可迭代对象
   * @return {*} 返回一个实例对象，值可能是结果数组或者失败理由
   * @memberof MyPromiPse
   */
  static all(iterable /* 可迭代对象 */) {
    // 返回结果一定是一个Promise实例
    return new MyPromise((resolve, reject) => {
      let index = 0; // 元素索引
      const result = []; // 全部解决的结果数组
      let resCount = 0; // 解决的个数
      let hasRejected = false; // 是否有拒绝
      for (const element of iterable) {
        const currentIndex = index;
        element.then(
          (res) => {
            if (hasRejected) {
              return;
            }
            result[currentIndex] = res;
            resCount++;
            if (resCount == result.length) {
              resolve(result);
            }
          },
          (err) => {
            if (hasRejected) {
              return;
            }
            hasRejected = true;
            reject(err);
          }
        );
        // 迭代统计元素个数
        index++;
      }
      // 如果迭代完，是个空
      if (index == 0) {
        // 返回值为空数组的解决态promise
        resolve([]);
      }
    });
  }

  /**
   * @description 模拟Promise.race
   * @static
   * @param {*} iterable 可迭代对象
   * @return {*}
   * @memberof MyPromise  返回最先解决的promise，完成和拒绝状态同等优先级，都没有回调就是pending
   */
  static race(iterable) {
    return new MyPromise((resolve, reject) => {
      let hasSettled = false;
      // 迭代参数的个数
      for (const element of iterable) {
        // 非promise转成promise实例
        element.then(
          (res) => {
            if (hasSettled) {
              return;
            }
            hasSettled = true;
            resolve(res);
          },
          (err) => {
            if (hasSettled) {
              return;
            }
            hasSettled = true;
            reject(err);
          }
        );
      }
    });
  }

  /**
   * @description 模拟Promise.prototype.then
   * @param {*} onResolved 解决回调函数
   * @param {*} onRejected 失败回调函数
   * @return {*} 返回一个new promise
  // 如果有第一个参数（onResolved）,将onResolved推进回调队列
  // 推进回调队列的有可能是一个promise
  // 如果是普通值，则正常return
  // 如果是promise，则用返回值的then()方法
   * @memberof MyPromise
   */
  then(onResolved, onRejected) {
    return new MyPromise((resolve, reject) => {
      if (typeof onResolved === "function") {
        this.resolvedCbs.push(() => {
          const result = onResolved(this.result);
          if (result instanceof MyPromise) {
            return result.then(resolve);
          }
          return result;
        });
      }
      if (typeof onRejected === "function") {
        this.rejectedCbs.push(() => {
          const result = onRejected(this.result);
          if (result instanceof MyPromise) {
            return result.then(null, reject);
          }
          return result;
        });
      }
    });
  }

  /**
   * @description 模拟Promise.prototype.catch
   * @param {*} onRejected 失败回调函数
   * @return {*}
   * @memberof MyPromise
   */
  catch(onRejected) {
    return this.then(null, onRejected);
  }
}
