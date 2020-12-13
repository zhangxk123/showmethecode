const promise = function () {
  return new Promise((resolve, reject) => {
    reject();
  });
};

Promise.all([promise().catch(() => "fail"), promise().catch(() => "fail")])
  .then((res) => {
    console.log("已完成", res);
  });
