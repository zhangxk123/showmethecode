/* eslint-disable import/prefer-default-export */
// 散列表
// 是字典的一种实现方式
// 尽可能快地在数据结构中找到一个值

// 常用的散列函数
export function djb2HashCode(key) {
  const tableKey = String(key);
  let hash = 5381;
  for (let i = 0; i < tableKey.length; i++) {
    hash = (hash * 33) + tableKey.chartCodeAt(i);
  }
  return hash % 1013;
}
