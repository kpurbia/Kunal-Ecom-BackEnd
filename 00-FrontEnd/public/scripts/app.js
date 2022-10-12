//////////////////////////////////////////////////////All product display for every user and guest
var productsDisplay = () => {
    let checkURL = "http://localhost:7000/productsDisplay";
    $.ajax({
        contentType: "application/json",
        url: checkURL,
        type: "GET",
        success: (data, status) => {
            for (let i = 0; i < data.length; i++) {
                document.getElementById("cardPlace").style.visibility = "visible";

                var bodyDiv = document.createElement("div")
                bodyDiv.classList.add("card","text-center");
                bodyDiv.setAttribute("id", "card");
                document.getElementById("cardPlace").appendChild(bodyDiv)

                var division = document.createElement("div");
                division.classList.add("card-body");
                division.setAttribute("id", "cardBody");
                document.getElementById("card").appendChild(division);

                var title = document.createElement("h5");
                title.classList.add("card-title");
                title.innerHTML = "<center>" + data[i].product_name + "</center>";

                var description = document.createElement("p");
                description.classList.add("card-text");
                description.innerHTML = data[i].product_description

                var detailButton = document.createElement("button");
                detailButton.classList.add("btn", "btn-primary");
                detailButton.setAttribute("id", "'" + data[i].product_id + "'");
                detailButton.innerHTML = "SEE DETAILS";
                detailButton.onclick = getProductDetail;

                var line = document.createElement("hr");
                line.style.padding = "2px"

                document.getElementById("cardBody").appendChild(title);
                document.getElementById("cardBody").appendChild(description);
                document.getElementById("cardBody").appendChild(detailButton);
                document.getElementById("cardBody").appendChild(line);
            }
        },
        error: (data, status) => {
            alert("You are not authenticated to access");
            localStorage.clear();
            window.location.href = "/login";
        }
    });
}

//////////////////////////////////////////////////////Checking Guest or USER and displaying product details only to user
//////////////////////////////////////////////////////By using product id storing the product detail in local storage of browser
var getProductDetail = (element) => {
    let getId = element.path[0].id;
    let product = {};
    product.id = getId;
    product = JSON.stringify(product)

    let token = window.localStorage.getItem("Authorization");

    if (token === null) {
        alert("Login or register to access more features");
        localStorage.clear();
        window.location.href = "/login";
    } else {
        let checkURL = "http://localhost:7000/productDetails";

        $.ajax({
            headers: { "Authorization": token },
            contentType: "application/json",
            url: checkURL,
            type: "POST",
            data: product,
            success: (data, status) => {
                data = JSON.stringify(data);
                localStorage.setItem("product", data);
                window.location.href = "/user/productDetails"
            },
            error: (data, status) => {
                alert("You are not authenticated to access");
                localStorage.clear();
                window.location.href = "/login";
            }
        });
    }
}

//////////////////////////////////////////////////////Getting data of product from browser and display on screen
var showProductDetail = () => {
    let product = localStorage.getItem("product");
    product = JSON.parse(product);

    document.getElementById("displayTitle").innerHTML = product.product_name;
    document.getElementById("displayPrice").innerHTML = "Rs. " + product.product_price;
    document.getElementById("displayCategory").innerHTML = product.product_category;
    document.getElementById("displayText").innerHTML = product.product_description;
    const addButton = document.createElement("button");
    addButton.classList.add("btn", "btn-primary");
    addButton.innerHTML = "ADD TO CART";
    addButton.onclick = addToCart;

    document.getElementById("displayBody").appendChild(addButton)
}

//////////////////////////////////////////////////////Fetching authorization token and checking only customer can add to cart
//////////////////////////////////////////////////////If user is not customer show alert of not customer
var addToCart = () => {
    let product = localStorage.getItem("product");
    product = JSON.parse(product);
    let cartProduct = {};
    cartProduct.productId = product.product_id;

    console.log(cartProduct);

    cartProduct = JSON.stringify(cartProduct);

    let token = window.localStorage.getItem("Authorization");
    let cartURL = "http://localhost:7000/cart";

    $.ajax({
        headers: { "Authorization": token },
        contentType: "application/json",
        url: cartURL,
        type: "POST",
        data: cartProduct,
        success: (data, status) => {
            if (data === "Customer") {
                let cartItems = [];
                let previousItem = localStorage.getItem("cart");
                if (previousItem === null) {
                    cartItems.push(cartProduct);
                    window.location.href = "/customer";
                } else {
                    cartItems.push(previousItem);
                    cartItems.push(cartProduct);
                    window.location.href = "/customer";
                }
                localStorage.setItem("cart", cartItems);
                localStorage.removeItem("product");
            } else {
                localStorage.removeItem("product");
                alert("Its not for you")
            }
        },
        error: (data, status) => {
            alert("You are not authenticated to access");
            localStorage.clear();
            window.location.href = "/login";
        }
    });
}