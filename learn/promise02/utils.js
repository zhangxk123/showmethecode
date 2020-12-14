const createPromise = (n) => () => (new Promise((resolve, reject) => {
  setTimeout(() => {
    console.log(n);
    resolve(n);
  }, 1000 * n);
}));

const logTime = () => {
  const t = new Date();
  console.log(`${t.getMinutes()}:${t.getSeconds()}`);
};
module.exports = {
  createPromise,
  logTime
};