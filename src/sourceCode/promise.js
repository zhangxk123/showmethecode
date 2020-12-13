/* eslint-disable consistent-return */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-loop-func */

const [PENDING, FULFILLED, REJECTED] = [Symbol("pending"), Symbol("fulfilled"), Symbol("rejected")];
/**
 * @description  按照 ZPromise/A+ 规范中对不同类型的返回值 X 的处理规则
 * @param {*} promise promise对象
 * @param {*} x promise对象的返回值
 * @param {*} resolve
 * @param {*} reject
 * @returns {*}
 */
const handleValue = (promise, x, resolve, reject) => {
  // 循环引用，自己等待自己完成，会出错，用reject传递出错误原因
  if (promise === x) {
    return reject(new TypeError('检测到Promise的链式循环引用'));
  }
  // 确保只传递出去一次值
  let once = false;
  if ((x !== null && typeof x === 'object') || typeof x === 'function') {
    // 防止重复去读取x.then
    const { then } = x;
    // 判断x是不是Promise
    if (typeof then === 'function') {
      // 调用then实例方法处理Promise执行结果
      then.call(x, (y) => {
        if (once) return;
        once = true;
        // 防止Promise中Promise执行成功后又传递一个Promise过来，
        // 要做递归解析。
        handleValue(promise, y, resolve, reject);
      }, (r) => {
        if (once) return;
        once = true;
        reject(r);
      });
    } else {
      // 如果x是个普通对象，直接调用resolve(x)
      resolve(x);
    }
  } else {
    // 如果x是个原始值，直接调用resolve(x)
    resolve(x);
  }
};
/**
 * @description 模拟Promise类
 * @export
 * @class ZPromise
 */
class ZPromise {
  constructor(excutor) {
    if (typeof excutor !== "function") {
      throw Error("参数必须是一个函数");
    }
    // 状态
    this.state = PENDING;
    //
    this.value = undefined;
    this.reason = undefined;
    // 回调队列
    this.resolvedCbs = [];
    this.rejectedCbs = [];
    // resolve操作
    const resolve = (value) => {
      if (this.state != PENDING) return;
      this.state = FULFILLED;
      this.value = value;
      this.resolvedCbs.map(cb.bind(this, value));
    };
    // reject操作
    const reject = (reason) => {
      if (this.state != PENDING) return;
      this.state = REJECTED;
      this.result = reason;
      this.rejectedCbs.map(cb.bind(this, reason));
    };
    try {
      excutor(resolve, reject);
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
   * @memberof ZPromise
   */
  static resolve(param) {
    if (param instanceof ZPromise) {
      // 幂等
      return param;
    }
    return new ZPromise((resolve) => {
      resolve(param);
    });
  }

  /**
   * @description 模拟Promise.reject
   * @static
   * @param {*} param
   * @return {*} 返回一个实例对象
   * @memberof ZPromise
   */
  static reject(param) {
    return new ZPromise((resolve, reject) => {
      reject(param);
    });
  }

  /**
   * @description 模拟Promise.all
   * @static
   * @param {*} iterable 可迭代对象
   * @return {*} 返回一个实例对象，值可能是结果数组或者失败理由
   * @memberof ZPromise
   */
  static all(iterable /* 可迭代对象 */) {
    // 返回结果一定是一个Promise实例
    return new ZPromise((resolve, reject) => {
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
   * @memberof ZPromise  返回最先解决的promise，完成和拒绝状态同等优先级，都没有回调就是pending
   */
  static race(iterable) {
    return new ZPromise((resolve, reject) => {
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
   * @memberof ZPromise
   */
  then(onFulfilled, onRejected) {
    // 值传递
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : (v) => v;
    onRejected = typeof onRejected === 'function' ? onRejected : (err) => { throw err; };
    const promise = new ZPromise((resolve, reject) => {
      // 解决状态
      if (this.status === FULFILLED) {
        if (onFulfilled && typeof onFulfilled === 'function') {
          setTimeout(() => {
            const x = onFulfilled(this.value);
            handleValue(promise, x, resolve, reject);
          }, 0);
        }
      }
      if (this.status === REJECTED) {
        if (onRejected && typeof onRejected === 'function') {
          setTimeout(() => {
            const x = onRejected(this.reason);
            handleValue(promise, x, resolve, reject);
          }, 0);
        }
      }
      // 注册时状态还是pending 将回调注册到cbs
      if (this.status === PENDING) {
        if (onFulfilled && typeof onFulfilled === 'function') {
          this.onFulfilled.push(() => {
            setTimeout(() => {
              const x = onFulfilled(this.value);
              handleValue(promise, x, resolve, reject);
            }, 0);
          });
        }
        if (onRejected && typeof onRejected === 'function') {
          this.onRejected.push(() => {
            setTimeout(() => {
              const x = onRejected(this.reason);
              handleValue(promise, x, resolve, reject);
            }, 0);
          });
        }
      }
    });
    // 返回一个新的promise
    return promise;
  }

  /**
   * @description 模拟Promise.prototype.catch
   * @param {*} onRejected 失败回调函数
   * @return {*}
   * @memberof ZPromise
   */
  catch(onRejected) {
    return this.then(null, onRejected);
  }

  static deferred() {
    const result = {};
    result.promise = new ZPromise((resolve, reject) => {
      result.resolve = resolve;
      result.reject = reject;
    });

    return result;
  }
}

module.exports = ZPromise;