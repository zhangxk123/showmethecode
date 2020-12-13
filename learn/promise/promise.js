const promise = function () {
  return new Promise((resolve, reject) => {
    resolve();
  });
};

const promise2 = promise()
  .then(() => "hello world");

promise2
  .catch((e) => {
    console.log(e);
  })
  .then((str) => {
    console.log(str);
  });
