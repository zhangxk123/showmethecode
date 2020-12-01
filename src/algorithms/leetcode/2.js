/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
const addTwoNumbers = function (l1, l2) {
  const arr = [];
  let temp = false;
  while (l1 != null || l2 != null || temp) {
    temp = temp + (l1 ? l1.val : 0) + (l2 ? l2.val : 0);
    arr.push({ val: temp % 10 });
    temp = temp > 9;
    l1 = l1 ? l1.next : null;
    l2 = l2 ? l2.next : null;
  }
  let i = 0;
  while (i < arr.length) {
    arr[i].next = arr[++i] || null;
  }
  return arr[0];
};
const l1 = {
  val: 1,
  next: {
    val: 6,
    next: {
      val: 0,
      next: {
        val: 3,
        next: {
          val: 3,
          next: {
            val: 6,
            next: {
              val: 7,
              next: {
                val: 2,
                next: {
                  val: 0,
                  next: {
                    val: 1,
                    next: null,
                  },
                },
              },
            },
          },
        },
      },
    },
  },
};
const l2 = {
  val: 6,
  next: {
    val: 3,
    next: {
      val: 0,
      next: {
        val: 8,
        next: {
          val: 9,
          next: {
            val: 6,
            next: {
              val: 6,
              next: {
                val: 9,
                next: {
                  val: 6,
                  next: {
                    val: 1,
                    next: null,
                  },
                },
              },
            },
          },
        },
      },
    },
  },
};
const l3 = {
  val: 9,
  next: {
    val: 9,
    next: {
      val: 9,
      next: {
        val: 9,
        next: {
          val: 9,
          next: {
            val: 9,
            next: {
              val: 9,
              next: null
            }
          }
        }
      }
    }
  }
};
const l4 = {
  val: 9,
  next: {
    val: 9,
    next: {
      val: 9,
      next: {
        val: 9,
        next: null
      }
    }
  }
};
console.log(addTwoNumbers(l1, l2));
console.log(addTwoNumbers(l3, l4));
