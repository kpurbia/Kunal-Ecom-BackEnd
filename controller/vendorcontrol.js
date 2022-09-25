const vendorDB = require('../model/vendordb');
let vendor_id;

exports.registerDetail = function(req, res){
    res.send("<h3>Hello vendor, welcome to registration page, follow the instructions given below</h3><p>Fill all the required details and press send</p><h5>Details required for registering your account as a vendor</h5><ul><li>Company Name</li><li>GovtId</li><li>Email</li><li>Password</li><li>Confirm Password</li><li>Product Category (if any specific)</li><li>State</li><li>City</li></ul>");
}

exports.register = async function(req, res){
    let vendorData = req.body;
    if(vendorData.password == vendorData.conpassword){
        let vendor = await vendorDB.register(vendorData);
        // console.log(vendor);
        let checkVendor = await vendorDB.searchVendor(vendorData);
        // console.log(checkVendor);
        if(checkVendor.length == 1){
            res.send("<h1>Your account is registered, " +vendor.name+"</h1>");
        } else{
            // console.log("Inside else");
            vendorDB.remove(checkVendor);
            res.send("Your account is already registered, try login");
        }

    } else {
        res.send("Password do not match, try again")
    }
}

exports.loginDetail = function(req, res){
    res.send("<h3>Hello vendor, welcome to login page, please be ready with the following details to login to your account</h3><ul><li>Email</li><li>Password</li><li>GovtId</li></ul>");
}

exports.login = async function(req, res){
    let vendorData = req.body;
    let vendorDetail = await vendorDB.login(vendorData);
    // console.log(vendorDetail);
    if(vendorDetail.length == 0){
        res.send("Incorrect login details");
    } else{
        vendor_id = vendorDetail[0].vendor_id;
        // console.log(vendor_id);
        res.send("<h1>Welcome, "+vendorDetail[0].vendor_name+ "</h1><h3>Your id for further use is "+vendor_id+"</h3><p>Use 'http://localhost:3000/vendor/login/:id/product' to add, update, display or delete your products</p>");
    }
}

exports.productDisplay = async function(req, res){
    let vendor_login_id = req.params.id;
    // console.log(vendor_id);
    if(vendor_id == vendor_login_id){
        let vendor_product = await vendorDB.productDisplay(vendor_login_id);
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

exports.addProduct = async function(req, res){
    let productData = req.body;
    let productAdded = {}
    productAdded = await vendorDB.addProduct(productData, vendor_id);
    // console.log(productAdded);
    let checkProduct = await vendorDB.searchProduct(productData, vendor_id);
    // console.log(checkProduct);
    if(checkProduct.length == 1){
        res.send("<h1>Your product is added to display</h1>");
    } else{
        vendorDB.removeDuplicateProduct(checkProduct);
        res.send("<h1>This product is already added, you can update the details if you want</h1>");
    }
}

exports.updateProduct = async function(req, res){
    let updateData = req.body;
    vendorDB.updateProduct(updateData, vendor_id);
    let vendor_product = await vendorDB.productDisplay(vendor_id);
    let productDisplay = JSON.stringify(vendor_product);
    res.send(productDisplay+"\n<h1>Add more products to sell</h1><h3>Details of product required:</h3><ul><li>Product Name</li><li>Product Category</li><li>Product Price</li><li>Product quantity</li></ul>");
}

exports.deleteProduct = async function(req, res){
    let delete_product = req.body;
    vendorDB.deleteProduct(delete_product);
    let vendor_product = await vendorDB.productDisplay(vendor_id);
    let productDisplay = JSON.stringify(vendor_product);
    res.send(productDisplay+"\n<h1>Add more products to sell</h1><h3>Details of product required:</h3><ul><li>Product Name</li><li>Product Category</li><li>Product Price</li><li>Product quantity</li></ul>");
}