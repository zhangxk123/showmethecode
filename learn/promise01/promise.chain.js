function promiseCreator() {
  return new Promise(resolve) {
    setTimeout(resolve, 1000);
  }
}

function promiseCreator2() {
  return new Promise(resolve) {
    setTimeout(resolve, 2000);
  }
}

const promiseCreatorList = [
  promiseCreator,
  promiseCreator2,
];


