const tree = {
  val: 3,
  left: {
    val: 9,
    left: null,
    right: null
  },
  right: {
    val: 20,
    left: {
      val: 15,
    },
    right: {
      val: 7
    }
  }
};
/**
 * @description 遍历二叉树
 * @param {*} root 根节点
 * @returns {Array} [ 3, [ 9, 20 ], [ 15, 7 ] ]
 */
function traverseTree(root) {
  const res = [];
  const callback = (val, index) => {
    if (index > 0) {
      if (res[index]) {
        res[index].push(val);
      } else {
        res[index] = [val];
      }
    } else {
      res[index] = val;
    }
  };
  traverse(root, 0, callback);
  return res;
}
/**
 * @description 遍历节点，cb操作节点值
 * @param {*} node 节点
 * @param {*} index 层级
 * @param {*} cb 操作函数
 */
function traverse(node, index, cb) {
  if (node && node.val) {
    cb(node.val, index);
    index++;
    traverse(node.left, index, cb);
    traverse(node.right, index, cb);
  }
}
// run
console.time();
console.log(traverseTree(tree)); // [ 3, [ 9, 20 ], [ 15, 7 ] ]
console.timeEnd();