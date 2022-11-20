var getProfile = () => {
    window.location.href = "/vendor/profile";
}

var profileDetails = () => {
    let getProfileURL = "http://localhost:7000/vendor/getProfile"
    let token = window.localStorage.getItem("Authorization");
    $.ajax({
        headers: { "Authorization": token },
        contentType: "application/json",
        url: getProfileURL,
        type: "GET",
        success: (data, status) => {
            document.getElementById("name").value = data[0].user_name;
            document.getElementById("email").value = data[0].user_email;
            document.getElementById("password").value = data[0].user_password;
            document.getElementById("password2").value = data[0].user_password
            document.getElementById("govtid").value = data[1].vendor_govt_id;
            document.getElementById("category").value = data[1].vendor_category;
            document.getElementById("contact").value = data[0].user_contact;
            document.getElementById("state").value = data[0].user_state;
            document.getElementById("city").value = data[0].user_city;
        },
        error: (data, status) => {
            alert("You are not authenticated to access");
            localStorage.clear();
            window.location.href = "/login"
        }
    });
}

var updateVendor = () => {
    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let password2 = document.getElementById("password2").value;
    let govtid = document.getElementById("govtid").value;
    let category = document.getElementById("category").value;
    let contact = document.getElementById("contact").value;
    let state = document.getElementById("state").value;
    let city = document.getElementById("city").value;
    if (name == "" || email === "" || password === "" || password2 === "" || govtid === "" || category === "" || contact === "" || state === "" || city === "") {
        document.getElementById("passwordWarning").style.display = "none";
        document.getElementById("updateSuccess").style.display = "none";
        document.getElementById("detailWarning").style.display = "block";
    } else {
        if (password === password2) {
            let userDetail = {};
            userDetail.name = name;
            userDetail.email = email;
            userDetail.password = password;
            userDetail.password2 = password2;
            userDetail.govtid = govtid;
            userDetail.category = category;
            userDetail.contact = contact;
            userDetail.state = state;
            userDetail.city = city;

            userDetail = JSON.stringify(userDetail);

            let registerURL = "http://localhost:7000/vendor/updateProfile"
            let token = window.localStorage.getItem("Authorization");
            $.ajax({
                headers: { "Authorization": token },
                contentType: "application/json",
                url: registerURL,
                type: "POST",
                data: userDetail,
                timeout: 15000,
                success: (data, status) => {
                    if (data === "User updated") {
                        document.getElementById("detailWarning").style.display = "none";
                        document.getElementById("passwordWarning").style.display = "none";
                        document.getElementById("updateSuccess").style.display = "block";
                    }
                }
            });
        } else {
            document.getElementById("updateSuccess").style.display = "none";
            document.getElementById("detailWarning").style.display = "none";
            document.getElementById("passwordWarning").style.display = "block";
        }
    }
}

var deleteForm = () => {
    document.getElementById("deleteForm").style.display = "block";
    window.scrollTo(0, document.body.scrollHeight);
}

var deleteVendor = () => {
    let email = document.getElementById("deleteEmail").value;
    let password = document.getElementById("deletePassword").value;
    if (password === "" || email === "") {
        document.getElementById("deleteDetailWarning").style.display = "block";
    } else {
        let userData = {};
        userData.email = email;
        userData.password = password;

        userData = JSON.stringify(userData);

        let token = window.localStorage.getItem("Authorization");
        let deleteURL = "http://localhost:7000/vendor/deleteProfile";
        $.ajax({
            headers: { "Authorization": token },
            contentType: "application/json",
            url: deleteURL,
            type: "DELETE",
            data: userData,
            success: (data, status) => {
                localStorage.clear();
                window.location.href = "/vendor/register";
            },
            error: (data, status) => {
                alert("You are not authenticated to access");
                localStorage.clear();
                window.location.href = "/login";
            }
        });
    }
}

var addProduct = () => {
    window.location.href = "/addProduct";
}

var addToInventory = () => {
    let pName = document.getElementById("pName").value;
    let pCategory = document.getElementById("pCategory").value;
    let pDescription = document.getElementById("pDescription").value;
    let pPrice = document.getElementById("pPrice").value;
    let pQuantity = document.getElementById("pQuantity").value;

    if (pName === "" || pCategory === "" || pDescription === "" || pPrice === "" || pQuantity === "") {
        document.getElementById("detailWarning").style.display = "block";
    } else {
        let pDetails = {};
        pDetails.pName = pName;
        pDetails.pCategory = pCategory;
        pDetails.pDescription = pDescription;
        pDetails.pPrice = pPrice;
        pDetails.pQuantity = pQuantity;

        pDetails = JSON.stringify(pDetails);

        let token = window.localStorage.getItem("Authorization");
        let checkURL = "http://localhost:7000/vendor/addproduct";
        $.ajax({
            headers: { "Authorization": token },
            contentType: "application/json",
            url: checkURL,
            type: "POST",
            data: pDetails,
            success: (data, status) => {
                window.location.href = "/vendor"
            },
            error: (data, status) => {
                alert("You are not authenticated to access");
                localStorage.clear();
                window.location.href = "/login";
            }
        });
    }
}

var getProducts = () => {
    window.location.href = "/vendor/products";
}

var vendorProductDisplay = () => {
    let token = window.localStorage.getItem("Authorization");
    let checkURL = "http://localhost:7000/vendor/vendorProducts";
    $.ajax({
        headers: { "Authorization": token },
        contentType: "application/json",
        url: checkURL,
        type: "GET",
        success: (data, status) => {
            console.log(data);
            // for (let i = 0; i < data.length; i++) {
            //     document.getElementById("cardPlace").style.visibility = "visible";

            //     var bodyDiv = document.createElement("div")
            //     bodyDiv.classList.add("card", "text-center");
            //     bodyDiv.setAttribute("id", "card");
            //     document.getElementById("cardPlace").appendChild(bodyDiv)

            //     var division = document.createElement("div");
            //     division.classList.add("card-body");
            //     division.setAttribute("id", "cardBody");
            //     document.getElementById("card").appendChild(division);

            //     var title = document.createElement("h5");
            //     title.classList.add("card-title");
            //     title.innerHTML = "<center>" + data[i].product_name + "</center>";

            //     var description = document.createElement("p");
            //     description.classList.add("card-text");
            //     description.innerHTML = data[i].product_description

            //     var detailButton = document.createElement("button");
            //     detailButton.classList.add("btn", "btn-primary");
            //     detailButton.setAttribute("id", "'" + data[i].product_id + "'");
            //     detailButton.innerHTML = "SEE DETAILS";
            //     detailButton.onclick = getProductDetail;

            //     var line = document.createElement("hr");
            //     line.style.padding = "2px"

            //     document.getElementById("cardBody").appendChild(title);
            //     document.getElementById("cardBody").appendChild(description);
            //     document.getElementById("cardBody").appendChild(detailButton);
            //     document.getElementById("cardBody").appendChild(line);
            // }
        },
        error: (data, status) => {
            alert("You are not authenticated to access");
            localStorage.clear();
            window.location.href = "/login";
        }
    });
}