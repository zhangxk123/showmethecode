/* eslint-disable no-mixed-operators */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-loop-func */
/* eslint-disable no-restricted-syntax */
/* eslint-disable consistent-return */
const [PENDING, FULFILLED, REJECTED] = [Symbol('pending'), Symbol('fulfilled'), Symbol('rejected')];
// 异步执行函数
const asyncFunc = function (fn, ...args) {
  setTimeout(() => {
    fn.apply(this, args);
  }, 0);
};
/**
 * @description promise值的处理
 * @param {*} promise 当前promise
 * @param {*} x 上一个promise的值
 * @param {*} resolve 当前promise的解决函数
 * @param {*} reject 当前promise的拒绝函数
 */
function handleValue(promise, x, resolve, reject) {
  if (promise === x) {
    return reject(new TypeError('循环引用'));
  }
  let called = false;
  if (typeof x === "object" && x !== null || typeof x === "function") {
    try {
      const { then } = x;
      // x是一个thenable对象
      if (typeof then === "function") {
        then.call(x, (y) => {
          if (called) return;
          called = true;
          handleValue(promise, y, resolve, reject);
        }, (err) => {
          if (called) return;
          called = true;
          reject(err);
        });
      } else {
        // x 是普通对象
        resolve(x);
      }
    } catch (error) {
      if (called) return;
      called = true;
      reject(error);
    }
  } else {
    // x 是基本类型
    resolve(x);
  }
}
class PromiseA {
  constructor(excutor) {
    this.state = PENDING; // 状态
    this.value = undefined;// 解决值
    this.reason = undefined;// 拒绝原因
    this.fulfilledCbs = [];// 解决后回调队列
    this.rejectedCbs = [];// 拒绝后回调队列
    // resolve 函数
    const resolveFn = (value) => {
      if (this.state === PENDING) {
        this.state = FULFILLED;
        this.value = value;
        this.fulfilledCbs.forEach((fn) => fn());
      }
    };
    // reject 函数
    const rejectFn = (reason) => {
      if (this.state === PENDING) {
        this.state = REJECTED;
        this.reason = reason;
        this.rejectedCbs.forEach((fn) => fn());
      }
    };
    try {
      excutor(resolveFn, rejectFn);
    } catch (error) {
      rejectFn(error);
    }
  }

  then(onResolved, onRejected) {
    // 值穿透
    onResolved = typeof onResolved === "function" ? onResolved : (value) => value;
    onRejected = typeof onRejected === "function" ? onRejected : (reason) => { throw reason; };
    const promise = new PromiseA((resolve, reject) => {
      if (this.state === FULFILLED) {
        setTimeout(() => {
          try {
            const x = onResolved(this.value);
            handleValue(promise, x, resolve, reject);
          } catch (error) {
            reject(error);
          }
        }, 0);
      }
      if (this.state === REJECTED) {
        if (onRejected && typeof onRejected === 'function') {
          setTimeout(() => {
            try {
              const x = onRejected(this.reason);
              handleValue(promise, x, resolve, reject);
            } catch (error) {
              reject(error);
            }
          }, 0);
        }
      }
      // 调用then时，状态还是pending则将回调函数先缓存，等状态变更后依次执行
      if (this.state === PENDING) {
        this.fulfilledCbs.push(() => {
          setTimeout(() => {
            try {
              const x = onResolved(this.value);
              handleValue(promise, x, resolve, reject);
            } catch (error) {
              reject(error);
            }
          }, 0);
        });
        if (onRejected && typeof onRejected === "function") {
          this.rejectedCbs.push(() => {
            setTimeout(() => {
              try {
                const x = onRejected(this.reason);
                handleValue(promise, x, resolve, reject);
              } catch (error) {
                reject(error);
              }
            }, 0);
          });
        }
      }
    });
    return promise;
  }

  catch(onRejected) {
    this.then(null, onRejected);
  }

  static resolve(val) {
    if (val instanceof PromiseA) {
      return val;
    }
    return new PromiseA((resolve, reject) => {
      resolve(val);
    });
  }

  static reject(reason) {
    return new PromiseA((resolve, reject) => {
      reject(reason);
    });
  }

  static all(list) {
    if (list && list.length == 0) {
      return new PromiseA((resolve) => {
        resolve([]);
      });
    }
    return new PromiseA((resolve, reject) => {
      const res = [];
      let count = 0;
      for (const [i, item] of list.entries()) {
        item.then((x) => {
          res[i] = x;
          count++;
          (count == list.length) && resolve(res);
        }, (err) => {
          reject(err);
        });
      }
    });
  }

  static race(list) {
    return new PromiseA((resolve, reject) => {
      let stop = false;
      for (const item of list.values()) {
        item.then((x) => {
          if (!stop) {
            stop = true;
            resolve(x);
          }
        }, (err) => {
          if (!stop) {
            stop = true;
            reject(err);
          }
        });
      }
    });
  }

  // 无论promise成功与失败 都会执行cb
  static finally(cb) {
    return this.then(
      (value) => PromiseA.resolve(cb()).then(() => value),
      (reason) => PromiseA.resolve(cb()).then(() => reason)
    );
  }

  // test
  static defer() {
    const dfd = {};
    dfd.promise = new PromiseA((resolve, reject) => {
      dfd.resolve = resolve;
      dfd.reject = reject;
    });
    return dfd;
  }

  static deferred() {
    const dfd = {};
    dfd.promise = new PromiseA((resolve, reject) => {
      dfd.resolve = resolve;
      dfd.reject = reject;
    });
    return dfd;
  }
}
module.exports = PromiseA;