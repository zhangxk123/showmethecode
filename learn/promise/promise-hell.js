function createPromise() {
  return new Promise((resolve) => {
    resolve();
  });
}

createPromise()
  .then((res) => promise2
    .then((result) => promise3
      .then((res3) => {
        // ...
      })));