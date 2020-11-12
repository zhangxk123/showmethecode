//深拷贝
export default function deepClone(obj, cache = new WeakMap()) {
	//原始值
	if (!(obj instanceof Object)) {
		return obj;
	}
	//防止循环引用
	if (cache.get(obj)) return cache.get(obj);
	//函数
	if (typeof obj == "function") {
		return function () {
			return obj.apply(arguments);
		};
	}
	//日期
	if (obj instanceof Date) {
		return new Date(obj);
	}
	//正则
	if (obj instanceof RegExp) {
		return new RegExp(obj.source, obj.flags);
	}
	let cloneTarget = Object.create(null);
	cache.set(obj, cloneTarget);
	//set
	if (obj instanceof Set) {
		cloneTarget = new Set();
		obj.forEach(item => cloneTarget.add(deepClone(item, cache)));
		return cloneTarget;
	}
	//map
	if (obj instanceof Map) {
		cloneTarget = new Map();
		obj.forEach((item, key) => cloneTarget.set(key, deepClone(item, cache)));
		return cloneTarget;
	}
	//对象或者数组
	cloneTarget = Array.isArray(obj) ? [] : {};
	Object.keys(obj).forEach(key => {
		cloneTarget[key] = deepClone(obj[key], cache);
	});
	return cloneTarget;
}
//test
console.info("------------------test deepClone start--------------------");
let obj = {
	zero: null,
	zero2: undefined,
	fn() {
		alert(1);
	},
	arr: [1, 2, 3],
	d: new Date(),
	s: new Set(),
	m: new Map(),
	r: /\d+/,
	o: {
		a: 1,
		b: {
			b: {
				b: {
					b: {
						b: {},
					},
				},
			},
		},
	},
};
obj.self = obj;
obj.arr.push(obj);
obj.s.add(obj);
obj.m.set("obj", obj);
console.log(obj);
console.time();
let cloneObj = deepClone(obj);
console.timeEnd();
console.log(Object.entries(obj));

console.info("------------------test deepClone end--------------------");
