/**
 * @description 实现一个轮询功能，包装异步请求，成功则成功，失败则最多尝试max次
 * @param {any} req 异步请求函数，返回thenable对象
 * @param {any} max 最大尝试次数
 * @param {any} delay 尝试时间间隔 1.5递增
 * @return {any} Promise实例
 */
Promise.poll = (req, max, delay = 1000) => new Promise((resolve, reject) => {
  let count = 0;
  let timer;
  const self = () => {
    req().then((data) => {
      clearTimeout(timer);
      return resolve(data);
    }).catch((error) => {
      if (count == max) {
        clearTimeout(timer);
        return reject(error);
      }
      delay *= 1.5;
      timer = setTimeout(self, delay);
    });
    count++;
  };
  self();
});

// test
const p = () => new Promise((resolve, reject) => {
  const random = Math.random() * 10;
  if (random >= 8) {
    console.log('>=8');
    resolve(random);
  } else {
    console.log('<8');
    reject(random);
  }
});
Promise.poll(p, 3).then((data) => {
  console.log('成功');
}).catch((err) => {
  console.log('尝试3次失败');
});