export default function func(arr) {
	let result = [arr[0]];
	let uniArr = arr[0].split(",");
	for (let i = 1; i < arr.length; i++) {
		//当前元素数组化
		const _currArr = arr[i].split(",");
		//将arr[i]与uniArr比较
		const _fitlerArr = _currArr.filter(c => uniArr.indexOf(c) == -1);
		if (_fitlerArr.length) {
			//去重后还有值，那么添加进result
			result.push(_fitlerArr.join(","));
		}
		uniArr = uniArr.concat(_fitlerArr);
	}
	return result;
}
let arr = ["a,b,d", "a,c,o", "c,d,e", "e,f,g", "g,c"];
console.log(func(arr)); //["a,b,d", "c,o", "e", "f,g"]
