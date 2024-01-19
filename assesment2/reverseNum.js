function reverseNum(num) {
    let numString = num.toString();
    let reversedString = numString.split('').reverse().join('');
    let reversedNum = parseInt(reversedString);
    if (num < 0) {
        reversedNum = -reversedNum;
    }

    return reversedNum;
}

console.log(reverseNum(500));
console.log(reverseNum(-56));
console.log(reverseNum(-90));
console.log(reverseNum(91));
