import Stack from "./index";
//十进制转二进制
function decimalToBinary(decNumber) {
	const remStack = new Stack();
	let number = decNumber;
	let rem = 0;
	let binaryString = "";
	while (number > 0) {
		rem = Math.floor(number % 2);
		remStack.push(rem);
		number = Math.floor(number / 2);
	}
	while (!remStack.isEmpty()) {
		binaryString += remStack.pop();
	}
	return binaryString;
}
//十进制转其他进制,支持2-36进制
function baseConverter(decNumber, base=10) {
	if (base < 2 || base > 36) {
		return "";
	}
	const remStack = new Stack();
	const digits = "0123456789ABCDEFGHIGKLMNOPQRSTUVWXYZ";
	let number = decNumber;
	let rem = 0;
	let binaryString = "";
	while (number > 0) {
		rem = Math.floor(number % base);
		remStack.push(rem);
		number = Math.floor(number / base);
	}
	while (!remStack.isEmpty()) {
		binaryString += digits[remStack.pop()];
	}
	return binaryString;
}
export { decimalToBinary, baseConverter };
