import jwt from 'jsonwebtoken';

export default class Vendor {

    //////////////////////////////////////////////////////Creating Dependency Injection
    constructor(userMgr, vendorMgr){
        this.vendorManager = vendorMgr;
        this.userManager = userMgr;
    }

    //////////////////////////////////////////////////////Registering vendor
    registerVendor = async (req, res) => {
        let vendorData = req.body;
        let role = "Vendor"
        this.userManager.register(vendorData, role)
        let checkUser = await this.userManager.checkUser(vendorData);
        let userId = checkUser[0].user_id
        if (checkUser.length == 1) {
            this.vendorManager.register(vendorData, userId);
            let checkVendor = await this.vendorManager.checkVendor(vendorData);
            if (checkVendor.length == 1) {
                res.send("success");
            } else {
                this.userManager.removegovtid(checkUser);
                this.vendorManager.remove(checkVendor);
                res.send("Id already registered");
            }
        } else {
            this.userManager.remove(checkUser);
            res.send("Email already registered");
        }
    }

    //////////////////////////////////////////////////////Get vendor profile
    getVendorProfile = async (req, res) => {
        if(req.session){
            let token = req.header("Authorization");
            let decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
            if(decodedToken.role === "Vendor"){
                let userId = decodedToken.userId;
                let vendorData = await this.vendorManager.getVendorData(userId);
                let vendor_user_id = vendorData[0].user_id;
                let vendorDetail = await this.vendorManager.getVendorDetail(vendor_user_id);
                let vendorInfo = [];
                vendorInfo.push(vendorData[0]);
                vendorInfo.push(vendorDetail[0]);
                res.status(200).send(vendorInfo)
            } else{
                req.session.destroy();
                res.status(400).send("Error occured");
            }
        } else{
            req.session.destroy();
            res.status(400).send("Session Expired");
        }
    }

    //////////////////////////////////////////////////////Update vendor profile
    updateVendorProfile = async (req, res) => {
        if(req.session){
            let token = req.header("Authorization");
            let decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
            if(decodedToken.role === "Vendor"){
                let userId = decodedToken.userId;
                let vendorDetail = await this.vendorManager.getVendorDetail(userId);
                let vendorId = vendorDetail[0].vendor_id;
                let updateData = req.body
                this.vendorManager.updateVendor(vendorId, updateData);
                this.userManager.updateUser(userId, updateData);
                res.status(200).send("User updated");
            } else{
                req.session.destroy();
                res.status(400).send("Error occured");
            }
        } else{
            req.session.destroy();
            res.status(400).send("Session Expired");
        }
    }

    //////////////////////////////////////////////////////Deleting Vendor Account
    deleteVendor = async (req, res) => {
        if(req.session){
            let token = req.header("Authorization");
            let decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
            if(decodedToken.role === "Vendor"){
                let vendorData = req.body;
                let checkVendor = await this.userManager.checkUser(vendorData);
                if(checkVendor[0].user_password === vendorData.password){
                    this.vendorManager.deleteVendor(checkVendor[0].user_id);
                    this.userManager.deleteUser(checkVendor[0].user_id);
                    req.session.destroy();
                    res.status(200).send("Account Deleted");
                } else{
                    req.session.destroy();
                    res.status(400).send("Invalid Password");    
                }
            } else {
                req.session.destroy();
                res.status(400).send("Error occured");
            }
        } 
        else{
            req.session.destroy();
            res.status(400).send("Session Expired");
        }
    }

    //////////////////////////////////////////////////////Adding product to product database
    addProduct = (req, res) => {
        if (req.session) {
            let token = req.header("Authorization");
            let decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
            if (decodedToken.role === "Vendor") {
                let productDetail = req.body;
                let vendorId = decodedToken.userId;
                this.vendorManager.addProduct(productDetail, vendorId);
                res.status(200).send("Added successfully");
            } else {
                req.session.destroy();
                res.status(400).send("Error occured");
            }
        } else{
            req.session.destroy();
            res.status(400).send("Session Expired");
        }
    }
}


// //////////////////////////////////////////////////////Display of details required for login
// exports.loginDetail = function (req, res) {
//     res.send("login");
// }

// //////////////////////////////////////////////////////Login Vendor
// exports.loginVendor = async function (req, res) {
//     let vendorData = req.body;
//     let vendorDetail = await this.vendorManager.login(vendorData);
//     if (vendorDetail.length == 0) {
//         res.send("<h1>Incorrect login details</h1>");
//     } else {
//         vendor_id = vendorDetail[0].vendor_id;
//         res.send("<h1>Welcome, " + vendorDetail[0].vendor_name + "</h1><h3>Your id for further use is " + vendor_id + "</h3><p>Use <ul><li>To get your all details and to update or delete your account--    'http://localhost:3000/vendor/login/:id'</li><li>To add, update, display or delete your products--    'http://localhost:3000/vendor/login/:id/product'</p></li></ul>");
//     }
// }

// //////////////////////////////////////////////////////Display of all details of vendor after successful login
// exports.vendorDetail = async function (req, res) {
//     let vendorId = req.params.id;
//     console.log(vendorId);
//     if (vendor_id == vendorId) {
//         let vendorDetail = await this.vendorManager.searchVendor(vendorId);
//         vendorDetail = JSON.stringify(vendorDetail);
//         res.send(vendorDetail);
//     } else {
//         res.send("<h1>Login details do not match, login again</h1>");
//     }
// }

// //////////////////////////////////////////////////////Updating details of vendor
// exports.updateDetail = async function (req, res) {
//     let vendorData = req.body;
//     if (vendorData.id == vendor_id) {
//         this.vendorManager.updateVendor(vendorData, vendor_id);
//         let vendorDetail = await this.vendorManager.searchVendor(vendorData.id);
//         vendorDetail = JSON.stringify(vendorDetail);
//         res.send("<h1>Your details are updated, New details are--</h1>" + vendorDetail);
//     } else {
//         res.send("<h1>Data not found, login again</h1>");
//     }
// }

// //////////////////////////////////////////////////////Deleting vendor
// exports.deleteVendor = function (req, res) {
//     let vendorId = req.body.id;
//     if (vendor_id == vendorId) {
//         this.vendorManager.deleteVendor(vendorId);
//         res.send("<h1>Your account is deleted</h1>")
//     } else {
//         res.send("<h1>You are not logged in, login again</h1>")
//     }
// }

// //////////////////////////////////////////////////////Vendor adding product for sell
// exports.addProduct = async function (req, res) {
//     let productData = req.body;
//     let productAdded = {}
//     productAdded = await this.vendorManager.addProduct(productData, vendor_id);
//     // console.log(productAdded);
//     let checkProduct = await this.vendorManager.searchProduct(productData, vendor_id);
//     // console.log(checkProduct);
//     if (checkProduct.length == 1) {
//         let vendor_product = await this.vendorManager.productDisplay(vendor_id);
//         let displayProduct = JSON.stringify(vendor_product);
//         res.send("<h1>Product added</h1>" + displayProduct + "\n<h1>Add more products to sell</h1><h3>Details of product required:</h3><ul><li>Product Name</li><li>Product Category</li><li>Product Price</li><li>Product quantity</li></ul>");
//     } else {
//         this.vendorManager.removeDuplicateProduct(checkProduct);
//         res.send("<h1>This product is already added, you can update the details if you want</h1>");
//     }
// }

// //////////////////////////////////////////////////////Displaying all products of vendor logged in
// exports.productDisplay = async function (req, res) {
//     let vendor_login_id = req.params.id;
//     // console.log(vendor_id);
//     if (vendor_id == vendor_login_id) {
//         let vendor_product = await this.vendorManager.productDisplay(vendor_login_id);
//         if (vendor_product.length == 0) {
//             res.send("<h1>No products added, add your products to sell</h1><h3>Details of product required:</h3><ul><li>Product Name</li><li>Product Category</li><li>Product Price</li><li>Product quantity</li></ul>")
//         } else {
//             let productDisplay = JSON.stringify(vendor_product);
//             res.send(productDisplay + "\n<h1>Add more products to sell</h1><h3>Details of product required:</h3><ul><li>Product Name</li><li>Product Category</li><li>Product Price</li><li>Product quantity</li></ul><h1>To update existing product price or quantity, product_id is required</h1>");
//         }

//     } else {
//         res.send("<h1>Incorrect id used, login again</h1>");
//     }
// }


// // productDetail

// // updateProduct

// // deleteProduct


// //////////////////////////////////////////////////////Updating detail of product
// exports.updateProduct = async function (req, res) {
//     let updateData = req.body;
//     this.vendorManager.updateProduct(updateData, vendor_id);
//     let vendor_product = await this.vendorManager.productDisplay(vendor_id);
//     let displayProduct = JSON.stringify(vendor_product);
//     res.send(displayProduct + "\n<h1>Add more products to sell</h1><h3>Details of product required:</h3><ul><li>Product Name</li><li>Product Category</li><li>Product Price</li><li>Product quantity</li></ul>");
// }

// //////////////////////////////////////////////////////Deleting product
// exports.deleteProduct = async function (req, res) {
//     let delete_product = req.body;
//     this.vendorManager.deleteProduct(delete_product);
//     let vendor_product = await this.vendorManager.productDisplay(vendor_id);
//     let displayProduct = JSON.stringify(vendor_product);
//     res.send(displayProduct + "\n<h1>Add more products to sell</h1><h3>Details of product required:</h3><ul><li>Product Name</li><li>Product Category</li><li>Product Price</li><li>Product quantity</li></ul>");
// }