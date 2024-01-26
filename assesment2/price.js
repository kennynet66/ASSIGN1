let price = [{ price: 10.99 }, { price: 29.99 }, { price: 5.99 }];

// item = {price: 10.99}

/* 
    1. loop through the price array and name one array obj item.
    2. access the value using item.price
    3. initalize a variable totalPrice and set it to 0
    4. log total price
 */

let totalPrice = 0;
price.forEach((item) => {
    let itemPrice = item.price;
    totalPrice += itemPrice
})
console.log(totalPrice);

/* let productsObject = {
    soap: {
        id: 1,
        price: 150,
        brand: "Menengai"
    },
    sugar: {
        id: 2,
        price: 150,
        brand: "kabras"
    },
    toothpaste: {
        id: 3,
        price: 100,
        brand: "colgate"
    }
}

let productsArray = [
    soap = [id=1, price=150, brand="Menengai"],
    sugar = [id=2, price=150, brand="kabras"],
    toothpaste = [id=3, price=100, brand="colgate"] 
] */