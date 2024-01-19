let inputString = prompt('Enter numbers separated by commas:');
let numbersArray = inputString.split(',').map(Number);
let sum = numbersArray.reduce((acc, num) => acc + num, 0);
console.log(sum);