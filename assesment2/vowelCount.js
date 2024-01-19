function vowelCount(word) {
    word = word.split('');
    let count = 0;
    word.forEach((letter) => {
        if (letter == "a" || letter == 'e' || letter == 'i' || letter == 'o' || letter == 'u') {
            count += 1;
        }
    })
    return count;
}

console.log(vowelCount("Hello there"));