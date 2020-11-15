export default function func(arr) {
  const result = [arr[0]];
  let uniArr = arr[0].split(',');

  function filterHandler(item, index) {
    return !uniArr.includes(item);
  }

  for (let i = 1; i < arr.length; i++) {
    // 当前元素数组化
    const _currArr = arr[i].split(',');
    // 将arr[i]与uniArr比较
    const _fitlerArr = _currArr.filter(filterHandler);
    if (_fitlerArr.length) {
      // 去重后还有值，那么添加进result
      result.push(_fitlerArr.join(','));
    }
    uniArr = uniArr.concat(_fitlerArr);
  }
  return result;
}
const arr = ['a,b,d', 'a,c,o', 'c,d,e', 'e,f,g', 'g,c'];
console.log(func(arr)); // ["a,b,d", "c,o", "e", "f,g"]