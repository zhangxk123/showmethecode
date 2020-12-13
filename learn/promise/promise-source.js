/* eslint-disable default-case */
/* eslint-disable no-restricted-syntax */
class CustomPromise {
  constructor(handleFunc) {
    this.state = 'pending';
    this.value = undefined;

    this.fulfilledList = [];

    handleFunc(this.triggerResolve.bind(this));
  }

  triggerResolve(val) {
    setTimeout(() => {
      if (this.state !== 'pending') return;

      this.state = 'fulfilled';
      this.value = val;
      this.fulfilledList.forEach((item) => item(val));
      this.fulfilledList = [];
    }, 0);
  }

  then(onFulfilled, onRejected) {
    const { value, state } = this;

    return new CustomPromise((onNextFulfilled, onNextRejected) => {
      function onFinalFulfilled(val) {
        if (typeof onFulfilled !== "function") {
          // 如果 onFulfilled 不是函数，跳过
          onNextFulfilled(val);
        } else {
          const res = onFulfilled(val);

          if (res && typeof res.then === 'function') {
            // res 是一个 promise
            res.then(onNextFulfilled);
          } else {
            // res 非 promise，则直接执行下一个 onNextFulfilled
            onNextFulfilled(res);
          }
        }
      }

      switch (state) {
      case "pending": {
        this.fulfilledList.push(onFinalFulfilled);
        break;
      }
      }
    });
  }

  catch(onRejected) {
    return this.then(null, onRejected);
  }

  static all(list) {
    return new CustomPromise((resolve, reject) => {
      let count = 0;
      const values = [];
      for (const [i, customPromiseInstance] of list.entries()) {
        customPromiseInstance
          .then(
            (res) => {
              values[i] = res;
              count++;
              if (count === list.length) resolve(values);
            },
            (err) => {
              reject(err);
            }
          );
      }
    });
  }

  static resolve(val) {
    return new CustomPromise((resolve) => resolve(val));
  }
}

const createPromise = function (time) {
  return new CustomPromise((resolve, reject) => {
    setTimeout(() => { resolve(new Date().getTime()); }, time);
  });
};

const promiseInstance = createPromise(1000);

promiseInstance.then(() => {
  console.log("promise.then: hello world");
});

Promise.all([createPromise(2000), createPromise(1000)])
  .then((res) => {
    console.log("Promise.all", res);
  });
