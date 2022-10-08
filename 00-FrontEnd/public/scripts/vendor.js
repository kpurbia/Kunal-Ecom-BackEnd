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
                    if(data === "User updated"){
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

var getProducts = () => {
    alert("Get Products");
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
        let checkURL = "http://localhost:7000/addproduct";
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
                window.location.href = "/login"
            }
        });
    }
}