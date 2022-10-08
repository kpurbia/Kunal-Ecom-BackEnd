var getProfile = () => {
    alert("Profile");
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
            headers: {"Authorization": token},
            contentType: "application/json",
            url: checkURL,
            type: "POST",
            data: pDetails,
            success: (data, status)=>{
                window.location.href = "/vendor"
            },
            error: (data, status)=>{
                alert("You are not authenticated to access");
                localStorage.clear();
                window.location.href = "/login"
            }
        });
    }
}