// @arr {Array}
// @result {Tree}
const arr = [{ id: 1 }, { id: 2 }, { id: 3 }];
// eslint-disable-next-line no-shadow
function transfer(arr) {
  let i = 0;
  while (i < arr.length) {
    arr[i].children = arr[++i] ? [arr[++i]] : [];
  }
  return arr[0];
}
const result = transfer(arr);// {id:1,children:[{id:2,children:{id:3,children:[]}}]}
