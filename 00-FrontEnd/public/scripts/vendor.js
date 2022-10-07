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
        alert(pDetails);
    }
}