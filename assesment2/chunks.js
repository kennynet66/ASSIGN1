function chunkArray(arr, chunkSize) {
    if (chunkSize <= 0) {
        return "Chunk size should be greater than 0.";
    }

    let result = [];
    for (let i = 0; i < arr.length; i += chunkSize) {
        result.push(arr.slice(i, i + chunkSize));
    }

    return result;
}
console.log(chunkArray([1, 2, 3, 3, 4, 5, 6, 7], 3));

console.log(chunkArray([1, 2, 3, 5, 6, 7], 1));
