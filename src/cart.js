/**
 * ! Get the variables
 */
let label = document.getElementById("label");
let shoppingCart = document.getElementById("shopping-cart");

console.log(shopItemsData)

/**
 * ! Get data from localStorage and populate cart
 */
let basket = JSON.parse(localStorage.getItem("data")) || [];


let calculation = (id) => {
    let cartIcon = document.getElementById("cartAmount");
    let productTotal = basket.map(x => x.item).reduce((x, y) => x + y, 0);
    cartIcon.innerHTML = productTotal;

}

calculation();

/**
 *! Function to generate Cart Items
 */
let generateCartItems = () => {
    if (basket.length !== 0) {
        return shoppingCart.innerHTML = basket.map(x => {
            const { id, item } = x;
            /**
             * ! This Search function will map through the shopItemsData to match the id with in it and that in the localStorage basket...
             */
            let search = shopItemsData.find(y => y.id === id) || [];
            let { img, name, price } = search;
            return `
                <div class="cart-item">
                    <img width="100" src=${img} alt="product" />
                    <div class="details">
                        <div class="title-price-x">
                            <h4 class="title-price">
                            <p>${name}</p>
                            <p class="cart-item-price">$ ${price}</p>
                            </h4>
                            <i onclick="removeItem(${id})" class="bi bi-x-lg"></i>
                        </div>
                    <div class="buttons">
                        <i onclick="increment(${id})" class="bi bi-plus-lg"></i>
                        <div id=${id} class="quantity">
                            ${item}
                        </div>
                        <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>
                    </div>
                        <h3>${item * search.price}</h3>
                    </div>
                </div>
            `
        }).join("")
     } else {
        shoppingCart.innerHTML = ``;
        label.innerHTML = `
            <h2>Cart is Empty</h2>
            <a href="/index.html">
                <button class="HomeBtn">Back to Home</button>
            <a/>
        `
     }
}
 
generateCartItems();

let increment = (id) => {
    let selectedItem = id;
    /**
     * ! Create a Search function to check if the Item already exists with in the Basket and Increment the item in case it does exist and push in a new item if it does not exist
     */
    let search = basket.find(x => x.id === selectedItem.id);

    if (search === undefined) { /** if the Item doesn't exist in the basket */
        basket.push({
            id: selectedItem.id,
            item: 1
        })
    } else { /** If the item already exists in the basket */
        search.item += 1;
    }

    generateCartItems();
    update(selectedItem.id);
    /** Save the item data to localstorage */
    localStorage.setItem("data", JSON.stringify(basket));
}

let decrement = (id) => {
    let selectedItem = id;
    /** 
     *! Create s Search function to check through the basket items
    */
    let search = basket.find(x => x.id === selectedItem.id);
    if (search === undefined) return;
    else if (search.item === 0) return;
    else {
        search.item -= 1;
    }

    update(selectedItem.id);
    basket = basket.filter(x => x.item !== 0); /** This Filter is to ensure that when the is zero for a particular product, then remove all its data from the basket.. */

    generateCartItems() /** This function re-renders the cards once the quantity on of the cards hits zero */

    localStorage.setItem("data", JSON.stringify(basket));
}

let update = (id) => {
    let search = basket.find(x => x.id === id);
    document.getElementById(id).innerHTML = search.item;

    calculation()
    TotalAmount();
}


let removeItem = (id) => {
    let selectedItem = id;
    basket = basket.filter((x) => x.id !== selectedItem.id);

    generateCartItems();

    TotalAmount();
    calculation();
    localStorage.setItem("data", JSON.stringify(basket));
}


/**
 *! Calculate the Total bill
 */

let TotalAmount = () => {
    if (basket.length !== 0) {
        let amount = basket.map(x => {
            let { item, id } = x;
            let search = shopItemsData.find(y => y.id === id);

            return item * search.price;
        }).reduce((x, y) => x + y, 0);
        label.innerHTML = `
        <h2> Total Bill : $ ${amount}</h2>
        <button class="checkout">Checkout</button>
        <button onclick="clearCart()" class="removeAll">Clear Cart</button>
        `
    } else return;
}

TotalAmount();
 
/**
 * ! Clear Cart function
 */

let clearCart = () => {
    basket = [];
    generateCartItems();
    calculation();
    localStorage.setItem("data", JSON.stringify(basket));
}
