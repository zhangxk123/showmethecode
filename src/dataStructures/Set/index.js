// 集合
// [值-值]存储的不重复的顺序的数据结构
const set0 = new Set();
// 创建有值的集合
const set = new Set([1, 2, 3]);
console.assert(set.size == 3, "不等于3就打印");
// 添加值
set.add(1); // Set{1,2,3}
set.add(4); // Set{1,2,3,4}
// 查询某值
set.has(1); // true
// 迭代
set.forEach();
set.keys();// Set Iterator{2,3,4}
set.values();// Set Iterator{2,3,4}
// 删除和清空
set.delete(1); // Set{2,3,4}
set.clear(); // Set(0){}

// 并集操作
export function union(setA, setB) {
  return new Set([...setA, ...setB]);
}
// 交集操作
export function intersection(setA, setB) {
  return new Set([...setA].filter((value) => setB.has(value)));
}
// 差集(存在set1不存在set2)
export function difference(setA, setB) {
  return new Set([...setA].filter((value) => !setB.has(value)));
}
// 子集(set1是否是set2的子集)
export function isSubsetof(setA, setB) {
  return [...setA].every((value) => setB.has(value));
}