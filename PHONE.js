let cart = JSON.parse(
    localStorage.getItem("phoneCart")
) || [];


// ==========================
// ADD TO CART
// ==========================

function addToCart(name, price) {

    cart.push({
        name: name,
        price: price
    });

    localStorage.setItem(
        "phoneCart",
        JSON.stringify(cart)
    );

    updateCart();

    alert(name + " has been added to your cart.");
}


// ==========================
// UPDATE CART
// ==========================

function updateCart() {

    let count =
        document.getElementById("cart-count");

    let items =
        document.getElementById("cart-items");

    let total =
        document.getElementById("cart-total");


    if (!count || !items || !total) {
        return;
    }


    count.textContent = cart.length;


    if (cart.length === 0) {

        items.innerHTML =
            "<p>Your cart is empty.</p>";

        total.textContent = "₦0";

        return;
    }


    items.innerHTML = "";


    let totalPrice = 0;


    cart.forEach(function(item, index) {

        totalPrice += item.price;


        items.innerHTML += `

            <div class="cart-item">

                <strong>
                    ${item.name}
                </strong>

                <br>

                ₦${item.price.toLocaleString()}

                <br>

                <button
                    onclick="removeFromCart(${index})"
                >
                    Remove
                </button>

            </div>

        `;
    });


    total.textContent =
        "₦" + totalPrice.toLocaleString();
}


// ==========================
// REMOVE FROM CART
// ==========================

function removeFromCart(index) {

    cart.splice(index, 1);

    localStorage.setItem(
        "phoneCart",
        JSON.stringify(cart)
    );

    updateCart();
}


// ==========================
// OPEN / CLOSE CART
// ==========================

function toggleCart() {

    let cartPanel =
        document.getElementById(
            "cart-panel"
        );

    cartPanel.classList.toggle("show");
}


// ==========================
// DARK MODE
// ==========================

function toggleDark() {

    document.body.classList.toggle(
        "dark"
    );

    localStorage.setItem(
        "darkMode",
        document.body.classList.contains(
            "dark"
        )
    );
}


// ==========================
// MOBILE MENU
// ==========================

function toggleMenu() {

    let nav =
        document.getElementById("nav");

    nav.classList.toggle("show");
}


// ==========================
// SEARCH
// ==========================

function searchProducts() {

    let search =
        document
        .getElementById("search")
        .value
        .toLowerCase();


    let cards =
        document.querySelectorAll(
            ".card"
        );


    cards.forEach(function(card) {

        let text =
            card.textContent.toLowerCase();


        if (text.includes(search)) {

            card.style.display = "";

        } else {

            card.style.display = "none";

        }

    });

}


// ==========================
// FILTER BY BRAND
// ==========================

function filterBrand(brand) {

    let cards =
        document.querySelectorAll(
            ".card"
        );


    cards.forEach(function(card) {

        let cardBrand =
            card.dataset.brand;


        if (
            brand === "" ||
            cardBrand === brand
        ) {

            card.style.display = "";

        } else {

            card.style.display = "none";

        }

    });

}


// ==========================
// LOAD SAVED SETTINGS
// ==========================

document.addEventListener(
    "DOMContentLoaded",
    function() {

        if (
            localStorage.getItem(
                "darkMode"
            ) === "true"
        ) {

            document.body.classList.add(
                "dark"
            );

        }


        updateCart();

    }
);