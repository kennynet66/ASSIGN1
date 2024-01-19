
function palindrome(theWord) {
    let reversedWord = theWord.split('').reverse('').join('');
    
    if(reversedWord == theWord){
        return (`${theWord} is a palindrome`)
    } else {
        return (`${theWord} is not a palindrome`)
    }

}

console.log(palindrome("civic"))