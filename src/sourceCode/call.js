//模拟call方法
const myCall = function (ctx, ...args) {
	//判断ctx是否存在，否则ctx=window
	if (ctx == null || ctx == undefined) {
		ctx = window;
	}
	let fnSelf = this;
	let SymbolCall = Symbol("call");
	ctx[SymbolCall] = fnSelf;
	const result = ctx[SymbolCall](...args);
	delete ctx[SymbolCall];
	return result;
};
export default myCall;

//test
console.info("------------------test call start--------------------");
Function.prototype.myCall = myCall;
let p = {
	name: "xiaoming",
	age: 18,
	length: 20,
};
console.log(Array.prototype.slice.call(p)); //[ <20 empty items> ]
console.log(Array.prototype.slice.myCall(p)); //[ <20 empty items> ]
console.log(Array.prototype.slice.call(p, 0, 1)); //[ <20 empty items> ]
console.log(Array.prototype.slice.myCall(p, 0, 1)); //[ <20 empty items> ]
console.info("------------------test call end--------------------");
