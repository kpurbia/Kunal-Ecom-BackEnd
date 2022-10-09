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

                var division = document.createElement("div");
                division.classList.add("card-body");
                division.setAttribute("id", "cardBody");
                document.getElementById("card").appendChild(division);

                var title = document.createElement("h5");
                title.classList.add("card-title");
                title.innerHTML = "<center>"+data[i].product_name+"</center>";

                var description = document.createElement("p");
                description.classList.add("card-text");
                description.innerHTML = data[i].product_description
                
                var detailButton = document.createElement("button");
                detailButton.classList.add("btn", "btn-primary", "detail-button");
                detailButton.setAttribute("id", "'"+data[i].product_id+"'");
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

var getProductDetail = (element) =>{
    var getId = element.path[0].id;
    alert(getId);
}