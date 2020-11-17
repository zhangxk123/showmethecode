/* eslint-disable import/prefer-default-export */
// 链表
// 优点：添加和删除元素不需要移动其他元素
// 缺点：访问某个元素，需要从表头（head）迭代到目标元素

// 基本机构
const linkedList = {
  value: 1,
  next: {
    value: 2,
    next: {
      value: 3,
      next: null
    }
  }
};
// 链表反转
export function reverseList(head) {
  let prev = null;
  let current = head;
  while (current != null) {
    const cnext = current.next;
    current.next = prev;
    prev = current;
    current = cnext;
  }
  return prev;
}