var getProfile = () => {
    alert("Profile");
}

var getOrders = () => {
    alert("Your Orders");
}

var getCart = () => {
    //////////////////////////////////////////////////////Displaying All items in cart to user
    let token = window.localStorage.getItem("Authorization");
    let cartURL = "http://localhost:7000/cart";
    $.ajax({
        headers: { "Authorization": token },
        contentType: "application/json",
        url: cartURL,
        type: "GET",
        success: (data, status) => {
            if (data === "NOT CUSTOMER") {
                alert(data)
                alert("Its not for you");
                window.location.href = "/login";
            } else {
                alert(data)
                console.log(data);
            }
        },
        error: (data, status) => {
            console.log(data);
            data = JSON.stringify(data);
            alert(data);
            alert("You are not authenticated to access");
            localStorage.clear();
            window.location.href = "/login";
        }
    });
}