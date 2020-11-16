// 字典，映射，关联数组
// [键-值]存储的无序数据结构
// 每个键只有一个值

// 创建一个空字典
const map = new Map();
// 创建一个有值的Map
const map2 = new Map([["xiaohong", "小红"], ["xiaoming", "小明"], ["xiaoqiang", "小强"]]);
// 添加键值
map.set("xiaohong", "小红");
map.set("xiaoming", "小明");
map.set("xiaoqiang", "小强");
// 查询map的值的个数
console.assert(map.size == 3, "不等于3就打印");
// 查询和取值
map.has("xiaohong");// true
map.get("xiaohong");// 小红
// 迭代
map.forEach();
map.keys();// MapIterator{"xiaohong", "xiaoming", "xiaoqiang"}
map.values();// MapIterator{"小红", "小明", "小强"}
map.entries();//  MapIterator{"xiaohong" => "小红", "xiaoming" => "小明", "xiaoqiang" => "小强"}
// 删除和清除
map.delete("xx");// false
map.delete("xiaohong");// true
map.clear();//  Map(0){}
