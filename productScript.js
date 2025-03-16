const data = JSON.parse(dataProduct);
const cardList = document.querySelector(".cardList");
const cart = document.querySelector(".cart");

cardList.innerHTML = "";

data.forEach((element) => {
    const itemEl = document.createElement("div");
    itemEl.classList.add("card");

    const itemImg = document.createElement("img");
    itemImg.src = element.url;

    const itemHeading = document.createElement("h1");
    itemHeading.textContent = element.name;

    const itemText = document.createElement("p");
    itemText.textContent = element.text;

    const itemPrice = document.createElement("h2");
    itemPrice.textContent = `$${element.price}`;

    const itemButton = document.createElement("button");
    itemButton.classList.add("add-to-cart");
    itemButton.textContent = "Add to Cart";

    itemButton.setAttribute("data-id", element["product-list"]);

    cardList.appendChild(itemEl);
    itemEl.appendChild(itemImg);
    itemEl.appendChild(itemHeading);
    itemEl.appendChild(itemText);
    itemEl.appendChild(itemPrice);
    itemEl.appendChild(itemButton);
});

function addToCart(productId) {
    const product = data.find((item) => item["product-list"] === productId);

    if (product) {
        const cartItem = document.createElement("li");
        cartItem.classList.add("cart-item");
        cartItem.setAttribute("data-id", productId);

        const itemImg = document.createElement("img");
        itemImg.src = product.url;
        itemImg.alt = product.name;
        itemImg.width = 50;

        const itemTitle = document.createElement("h3");
        itemTitle.textContent = product.name;

        const itemPrice = document.createElement("p");
        itemPrice.textContent = `$${product.price}`;

        const removeButton = document.createElement("button");
        removeButton.classList.add("remove-item");
        removeButton.textContent = "X";

        cartItem.appendChild(itemImg);
        cartItem.appendChild(itemTitle);
        cartItem.appendChild(itemPrice);
        cartItem.appendChild(removeButton);

        cart.appendChild(cartItem);
    }
}

function removeFromCart(event) {
    if (event.target.classList.contains("remove-item")) {
        const cartItem = event.target.closest(".cart-item");
        if (cartItem) {
            cartItem.remove();
        }
    }
}

document.addEventListener("click", (event) => {
    if (event.target.classList.contains("add-to-cart")) {
        const productId = event.target.getAttribute("data-id");
        addToCart(productId);
    }
});

cart.addEventListener("click", removeFromCart);