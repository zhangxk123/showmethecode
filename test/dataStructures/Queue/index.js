import Deque from "../../../src/dataStructures/Queue/Deque.js";
const deque = new Deque();
console.log(deque);
deque.addFront(1);
console.log(deque);
deque.addBack(2);
console.log(deque);
deque.addBack(3);
console.log(deque);
deque.removeBack();
console.log(deque);
deque.removeFront();
console.log(deque);
console.log(deque.peekFront());
console.log(deque.peekBack());
console.log(deque.size());
console.log(deque.isEmpty());
