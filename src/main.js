/** 
 *! Get the Variables 
 **/
let shop = document.getElementById("shop");

/** 
 *! The  basket contains the product that are going to be added to cart 
*/
let basket =JSON.parse(localStorage.getItem("data")) || [];


let generateShop = () => {
    return (shop.innerHTML = shopItemsData.map(x => {
        const { id, name, price, desc, img } = x;
        let search = basket.find(x => x.id === id) || [];
        return `
        <div id=product-id-${id} class="item">
            <img width="200" src=${img} alt="product">
            <div class="details">
                <h3>${name}</h3>
                <p>${desc}</p>
                <div class="price-quantity">
                    <h2>$ ${price}</h2>
                    <div class="buttons">
                        <i onclick="increment(${id})" class="bi bi-plus-lg"></i>
                        <div id=${id} class="quantity">
                            ${search.item === undefined ? 0 : search.item}
                        </div>
                        <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>
                    </div>
                </div>
            </div>
        </div>
            `
    }).join(""))
}

generateShop();

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
    /** Save the item data to localstorage */
    localStorage.setItem("data", JSON.stringify(basket));
    update(selectedItem.id);
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

    localStorage.setItem("data", JSON.stringify(basket));
}

let update = (id) => {
    let search = basket.find(x => x.id === id);
    document.getElementById(id).innerHTML = search.item;

    calculation()
}

/**
 * ! Calculation Function to the sum of all the numbers 
 */
let calculation = (id) => {
    let cartIcon = document.getElementById("cartAmount");
    let productTotal = basket.map(x => x.item).reduce((x, y) => x + y, 0);
    cartIcon.innerHTML = productTotal;

}

calculation();