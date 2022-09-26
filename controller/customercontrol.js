const customerDB = require('../model/customerdb');
let customer_id;

//////////////////////////////////////////////////////PRODUCT DISPLAY FOR GUEST
exports.guestDisplay = async function(req, res){
    let productDisplay = await customerDB.guestProduct();
    productDisplay = JSON.stringify(productDisplay);
    res.send("<h1>As a guest you can only see our products</h1><h3>To buy them, you need to register or login your account</h3>"+productDisplay);
}


//////////////////////////////////////////////////////Regitration of User
exports.registerDetail = function(req, res){
    res.send("<h3>Hello customer, welcome to registration page, follow the instructions given below</h3><p>Fill all the required details and press send</p><h5>Details required for registering your account as a customer</h5><ul><li>Name</li><li>Email</li><li>Password</li><li>Confirm Password</li><li>Contact</li><li>State</li><li>City</li></ul>");
}

exports.registerCustomer = async function(req, res){
    let customerData = req.body;
    if(customerData.password == customerData.conpassword){
        // res.send("Ínside If")
        let customer = await customerDB.register(customerData);
        // console.log(customer);
        let checkCustomer = await customerDB.checkCustomer(customerData);
        // console.log(checkCustomer);
        if(checkCustomer.length == 1){
            res.send("<h1>Your account is registered, " +customer.name+"</h1>");
        } else{
            // console.log("Inside else");
            customerDB.remove(checkCustomer);
            res.send("<h1>Your account is already registered, try login</h1>");
        }

    } else {
        res.send("<h1>Password do not match, try again</h1>")
    }
}


//////////////////////////////////////////////////////Login of User
exports.loginDetail = function(req, res){
    res.send("<h3>Hello customer, welcome to login page, please be ready with the following details to login to your account</h3><ul><li>Email</li><li>Password</li></ul>");
}

exports.loginCustomer = async function(req, res){
    let customerData = req.body;
    let customerDetail = await customerDB.login(customerData);
    // console.log(customerDetail);
    if(customerDetail.length == 0){
        res.send("<h1>Incorrect login details</h1>");
    } else{
        customer_id = customerDetail[0].customer_id;
        console.log(customer_id);
        res.send("<h1>Welcome, "+customerDetail[0].customer_name+ "</h1><h3>Your id for further use is "+customer_id+"</h3>");
    }
}


//////////////////////////////////////////////////////After login-- display customer data
exports.customerDetail = async function(req, res){
    let customerId = req.params.id;
    // console.log(customer_id);
    // console.log(customerId);
    if(customer_id == customerId){
        let customerDetail = await customerDB.searchcustomer(customerId);
        customerDetail = JSON.stringify(customerDetail);
        res.send(customerDetail);
    } else{
        res.send("<h1>Login details do not match, login again</h1>");
    }
}

//////////////////////////////////////////////////////After login-- update customer data
exports.updateDetail = async function(req, res){
    let customerData = req.body;
    // console.log(customerData.id);
    // console.log(customer_id);
    if(customerData.id == customer_id){
        customerDB.updatecustomer(customerData, customer_id);
        let customerDetail = await customerDB.searchcustomer(customerData.id);
        customerDetail = JSON.stringify(customerDetail);
        res.send("<h1>Your details are updated, New details are--</h1>"+customerDetail);   
    } else{
        res.send("<h1>Data not found, login again</h1>");
    }
}

//////////////////////////////////////////////////////After login-- delete customer data
exports.deletecustomer = function(req, res){
    let customerId = req.params.id;
    if(customer_id == customerId){
        customerDB.deletecustomer(customerId);
        res.send("<h1>Your account is deleted</h1>")
    } else{
        res.send("<h1>You are not logged in, login again</h1>")
    }
}


//////////////////////////////////////////////////////After login-- display of all products
exports.productDisplay = async function(req, res){
    let customerId = req.params.id;
    if(customer_id == customerId){
       let products = await customerDB.allProductDisplay();
        res.send(products);
    } else{
        res.send("<h1>Session Timeout, login again</h1>")
    }
}


//////////////////////////////////////////////////////After login- display of full product detail using product_id
exports.productDetail = async function(req, res){
    let customerId = req.params.id;
    let productId = req.params.productid;
    if(customerId == customer_id){
        let productDetail = await customerDB.productDisplay(productId);
        productDetail = JSON.stringify(productDetail);
        res.send(productDetail+"<h1>To add this product to cart, add quantity of products you want to buy in body</h1>");
    } else{
        res.send("<h1>Session Timeout, login again</h1>");
    }
}


//////////////////////////////////////////////////////After login- add selected product to cart
exports.addToCart = async function(req, res){
    let customerId = req.params.id;
    let productId = req.params.productid;
    let productQuantity = req.body.quantity;
    if(customerId == customer_id){
        let searchItem = await customerDB.searchItem();
        customerDB.addToCart(productId, customerId, productQuantity);
        let cartDisplay = await customerDB.cartDisplay();
        cartDisplay = JSON.stringify(cartDisplay);
        res.send("<h1>Product added to cart</h1>" + cartDisplay);

    } else{
        res.send("<h1>Session Timeout, login again</h1>");
    }
}

exports.cartDetail = async function(req, res){
    let customerId = req.params.id;
    if(customerId == customer_id){
        let cartDisplay = await customerDB.cartDisplay();

    }
}