const vendorDML = require('../models/vendorDML');
const userDML = require('../models/userDML');
const alert = require('alert');
let vendor_id;

//////////////////////////////////////////////////////Display of details required for registration
exports.registerDetail = function(req, res){
    res.render("vendors/registerVendor");
}

//////////////////////////////////////////////////////Registering vendor
exports.registerVendor = async function(req, res){
    let vendorData = req.body;
    let role = "Vendor"
    if(vendorData.password == vendorData.password2){
        userDML.register(vendorData, role)
        let checkUser = await userDML.checkUser(vendorData);
        let userId = checkUser[0].user_id
        if(checkUser.length == 1){
            vendorDML.register(vendorData, userId);
            let checkVendor = await vendorDML.checkVendor(vendorData);
            if(checkVendor.length == 1){
                alert("Your account is registered, login and explore");
                res.render("login");
            } else{
                userDML.removegovtid(checkUser);
                vendorDML.remove(checkVendor);
                alert("Your government id is already in use, please check");
                res.render("login");
            }
        } else{
            userDML.remove(checkUser);
            alert("Your email is already in use, try login");
            res.render("login");
        }

    } else {
        alert("Password do not match, try again");
        res.render("vendors/registerVendor")
    }
}

//////////////////////////////////////////////////////Display of details required for login
exports.loginDetail = function(req, res){
    res.render("login");
}

//////////////////////////////////////////////////////Login Vendor
exports.loginVendor = async function(req, res){
    let vendorData = req.body;
    let vendorDetail = await vendorDML.login(vendorData);
    if(vendorDetail.length == 0){
        res.send("<h1>Incorrect login details</h1>");
    } else{
        vendor_id = vendorDetail[0].vendor_id;
        res.send("<h1>Welcome, "+vendorDetail[0].vendor_name+ "</h1><h3>Your id for further use is "+vendor_id+"</h3><p>Use <ul><li>To get your all details and to update or delete your account--    'http://localhost:3000/vendor/login/:id'</li><li>To add, update, display or delete your products--    'http://localhost:3000/vendor/login/:id/product'</p></li></ul>");
    }
}

//////////////////////////////////////////////////////Display of all details of vendor after successful login
exports.vendorDetail = async function(req, res){
    let vendorId = req.params.id;
    console.log(vendorId);
    if(vendor_id == vendorId){
        let vendorDetail = await vendorDML.searchVendor(vendorId);
        vendorDetail = JSON.stringify(vendorDetail);
        res.send(vendorDetail);
    } else{
        res.send("<h1>Login details do not match, login again</h1>");
    }
}

//////////////////////////////////////////////////////Updating details of vendor
exports.updateDetail = async function(req, res){
    let vendorData = req.body;
    if(vendorData.id == vendor_id){
        vendorDML.updateVendor(vendorData, vendor_id);
        let vendorDetail = await vendorDML.searchVendor(vendorData.id);
        vendorDetail = JSON.stringify(vendorDetail);
        res.send("<h1>Your details are updated, New details are--</h1>"+vendorDetail);   
    } else{
        res.send("<h1>Data not found, login again</h1>");
    }
}

//////////////////////////////////////////////////////Deleting vendor
exports.deleteVendor = function(req, res){
    let vendorId = req.body.id;
    if(vendor_id == vendorId){
        vendorDML.deleteVendor(vendorId);
        res.send("<h1>Your account is deleted</h1>")
    } else{
        res.send("<h1>You are not logged in, login again</h1>")
    }
}

//////////////////////////////////////////////////////Vendor adding product for sell
exports.addProduct = async function(req, res){
    let productData = req.body;
    let productAdded = {}
    productAdded = await vendorDML.addProduct(productData, vendor_id);
    // console.log(productAdded);
    let checkProduct = await vendorDML.searchProduct(productData, vendor_id);
    // console.log(checkProduct);
    if(checkProduct.length == 1){
        let vendor_product = await vendorDML.productDisplay(vendor_id);
        let displayProduct = JSON.stringify(vendor_product);
        res.send("<h1>Product added</h1>"+displayProduct+"\n<h1>Add more products to sell</h1><h3>Details of product required:</h3><ul><li>Product Name</li><li>Product Category</li><li>Product Price</li><li>Product quantity</li></ul>");
    } else{
        vendorDML.removeDuplicateProduct(checkProduct);
        res.send("<h1>This product is already added, you can update the details if you want</h1>");
    }
}

//////////////////////////////////////////////////////Displaying all products of vendor logged in
exports.productDisplay = async function(req, res){
    let vendor_login_id = req.params.id;
    // console.log(vendor_id);
    if(vendor_id == vendor_login_id){
        let vendor_product = await vendorDML.productDisplay(vendor_login_id);
        if(vendor_product.length == 0){
            res.send("<h1>No products added, add your products to sell</h1><h3>Details of product required:</h3><ul><li>Product Name</li><li>Product Category</li><li>Product Price</li><li>Product quantity</li></ul>")
        } else{
            let productDisplay = JSON.stringify(vendor_product);
            res.send(productDisplay+"\n<h1>Add more products to sell</h1><h3>Details of product required:</h3><ul><li>Product Name</li><li>Product Category</li><li>Product Price</li><li>Product quantity</li></ul><h1>To update existing product price or quantity, product_id is required</h1>");
        }
        
    } else{
        res.send("<h1>Incorrect id used, login again</h1>");
    }
}


// productDetail

// updateProduct

// deleteProduct


//////////////////////////////////////////////////////Updating detail of product
exports.updateProduct = async function(req, res){
    let updateData = req.body;
    vendorDML.updateProduct(updateData, vendor_id);
    let vendor_product = await vendorDML.productDisplay(vendor_id);
    let displayProduct = JSON.stringify(vendor_product);
    res.send(displayProduct+"\n<h1>Add more products to sell</h1><h3>Details of product required:</h3><ul><li>Product Name</li><li>Product Category</li><li>Product Price</li><li>Product quantity</li></ul>");
}

//////////////////////////////////////////////////////Deleting product
exports.deleteProduct = async function(req, res){
    let delete_product = req.body;
    vendorDML.deleteProduct(delete_product);
    let vendor_product = await vendorDML.productDisplay(vendor_id);
    let displayProduct = JSON.stringify(vendor_product);
    res.send(displayProduct+"\n<h1>Add more products to sell</h1><h3>Details of product required:</h3><ul><li>Product Name</li><li>Product Category</li><li>Product Price</li><li>Product quantity</li></ul>");
}