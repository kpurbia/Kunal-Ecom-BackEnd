var productsDisplay = () => {
    let token = window.localStorage.getItem("Authorization");
    let checkURL = "http://localhost:7000/user/productsDisplay";
    $.ajax({
        headers: { "Authorization": token },
        contentType: "application/json",
        url: checkURL,
        type: "GET",
        success: (data, status) => {
            for (let i = 0; i < data.length; i++) {
                document.getElementById("card").style.visibility = "visible";
                var title = document.createElement("h5");
                title.classList.add("card-title", "me-3");
                title.innerHTML = data[i].product_name

                var description = document.createElement("p");
                description.classList.add("card-text", "me-3");
                description.innerHTML = data[i].product_description
                
                var detailButton = document.createElement("button");
                detailButton.classList.add("btn", "btn-primary");
                detailButton.innerHTML = "SEE DETAILS";

                document.getElementById("cardBody").appendChild(title);
                document.getElementById("cardBody").appendChild(description);
                document.getElementById("cardBody").appendChild(detailButton);
            }
        },
        error: (data, status) => {
            alert("You are not authenticated to access");
            localStorage.clear();
            window.location.href = "/login";
        }
    });
}