const customerDB = require('./dbserver.js');

//////////////////////////////////////////////////////Products display for guests
exports.guestProduct = function(){
    // console.log("Inside db");
    return new Promise((resolve) => {
        let searchQuery = "SELECT product.product_name, product.product_price, vendor.vendor_name FROM `product` INNER JOIN `vendor` ON product.product_vendor_id = vendor.vendor_id";
        customerDB.query(searchQuery, (err, result)=>{
            if(err){
                throw err;
            } else{
                resolve(result);
            }
        })

    })
}

//////////////////////////////////////////////////////Registration of customer
exports.register = function(data){
    return new Promise((resolve) => {
        let registerQuery = "INSERT INTO customer (customer_name, customer_email, customer_password, customer_contact, customer_state, customer_city) VALUES (?, ?, ?, ?, ?, ?);"
        let registerData = customerDB.format(registerQuery, [data.name, data.email, data.password, data.contact, data.state, data.city]);
        customerDB.query(registerData, (err, result)=>{
            if(err){
                throw err;
            } else{
                resolve(data);
            }
        })
    })
}

//////////////////////////////////////////////////////Checking data duplication of existing customer (Already registered)
exports.checkCustomer = function(data){
    return new Promise((resolve)=>{
        let searchQuery = "SELECT * FROM customer WHERE customer_email = '"+data.email + "'";
        // console.log(searchQuery);
        customerDB.query(searchQuery, (err, result)=>{
            if(err){
                throw err;
            } else{
                resolve(result);
            }
        })
    });
}

//////////////////////////////////////////////////////Removing duplicate data of cutomer
exports.remove = function(data){
    // console.log("Inside remove");
    // console.log(data);
    let removeQuery = 'DELETE FROM customer WHERE customer_id ='+data[1].customer_id;
    // console.log(removeQuery);
    customerDB.query(removeQuery, (err, result)=>{
        if(err){
            throw err;
        } else{
            console.log("Duplicate data removed");
        }
    })
}

//////////////////////////////////////////////////////Login of customer
exports.login = function(data){
    return new Promise((resolve)=>{
        let searchCmd = "SELECT * FROM customer WHERE customer_email = ? AND customer_password = ?"
        let searchQuery = customerDB.format(searchCmd, [data.email, data.password])
        // console.log(searchQuery);
        customerDB.query(searchQuery, (err, result)=>{
            if(err){
                throw err;
            } else{
                // console.log(result);
                resolve(result);
            }
        })
    })
}

//////////////////////////////////////////////////////Customer fetching own details after login
exports.searchcustomer = function(id){
    return new Promise((resolve) => {
        let searchQuery = "SELECT * FROM customer WHERE customer_id = "+id;
        customerDB.query(searchQuery, (err, result)=>{
            if(err){
                throw err;
            } else{
                resolve(result);
            }
        })
    })
}

//////////////////////////////////////////////////////Customer updating own data stored in account
exports.updatecustomer = function(data, id){
    let updateQuery = "UPDATE customer SET customer_name = '"+data.name+"', customer_email= '"+data.email+"', customer_password = '"+data.password+"', customer_contact = '"+data.contact+"', customer_state = '"+data.state+"', customer_city = '"+data.city+"' WHERE customer_id =" +id;
    customerDB.query(updateQuery, (err, result)=>{
        if(err){
            throw err;
        }
    })  
}

//////////////////////////////////////////////////////Customer deleting own account
exports.deletecustomer = function(id){
    let deleteQuery = "DELETE FROM customer WHERE customer_id = "+id;
    customerDB.query(deleteQuery, (err, result)=>{
        if(err){
            throw err;
        }
    })
}

//////////////////////////////////////////////////////Displaying all products to customer after successful login
exports.allProductDisplay = function(){
    return new Promise((resolve) => {
        let searchQuery = "SELECT product.product_id, product.product_name, product.product_price, vendor.vendor_name FROM `product` INNER JOIN `vendor` ON product.product_vendor_id = vendor.vendor_id";
        customerDB.query(searchQuery, (err, result)=>{
            if(err){
                throw err;
            } else{
                console.log(result);
                resolve(result);
            }
        })

    })
}

//////////////////////////////////////////////////////Displaying single product with full details for customer to add in their cart
exports.productDisplay = function(product_id){
    return new Promise((resolve) => {
        let searchQuery = "SELECT * FROM product WHERE product_id = "+product_id;
        customerDB.query(searchQuery, (err, result)=>{
            if(err){
                throw err;
            } else{
                resolve(result);
            }
        })
    })
}

//////////////////////////////////////////////////////Adding product to cart using post
exports.addToCart = function(product_id, customerId, productQuantity){
    let insertCmd = "INSERT INTO cart (cart_product_id, cart_customer_id, cart_product_quantity) VALUES (?, ?, ?)";
    let insertQuery = customerDB.format(insertCmd, [product_id, customerId, productQuantity]);
    customerDB.query(insertQuery, (err, resut)=>{
        if(err){
            throw err;
        }
    })
}

//////////////////////////////////////////////////////Searching item in cart
exports.searchItem = function(customerId, productId){
    return new Promise((resolve) => {
        let searchQuery = "SELECT * FROM cart WHERE cart_customer_id = "+customerId+" AND cart_product_id = "+productId;
        customerDB.query(searchQuery, (err, result)=>{
            if(err){
                throw err;
            } else{
                // console.log("Inside result");
                // console.log(result);
                resolve(result)
            }
        })
    })
}

//////////////////////////////////////////////////////Removing duplicate item in cart
exports.removeItem = function(data) {
    let removeQuery = "DELETE FROM cart WHERE cart_id = "+data[1].cart_id;
    customerDB.query(removeQuery, (err, result)=>{
        if(err){
            throw err;
        }
    })
}

//////////////////////////////////////////////////////Display all cart items
exports.cartDisplay = function (id) {
    return new Promise((resolve) => {
        let displayQuery = "SELECT * FROM cart WHERE cart_customer_id = "+id;
        customerDB.query(displayQuery, (err, result)=>{
            if(err){
                throw err;
            } else{
                resolve(result);
            }
        })
    })
    
}

//////////////////////////////////////////////////////Display selected cart item
exports.cartItemDisplay = function(cartid){
    return new Promise((resolve)=>{
        let displayQuery = "SELECT * FROM cart WHERE cart_id = "+cartid;
        customerDB.query(displayQuery, (err, result)=>{
            if(err){
                throw err;
            } else{
                resolve(result);
            }
        })
    });
}

//////////////////////////////////////////////////////Remove selected cart item or cart item placed for order
exports.removeCartItem = function(cartId){
    let deleteItemQuery = "DELETE FROM cart WHERE cart_id = "+cartId;
    customerDB.query(deleteItemQuery, (err, result)=>{
        if(err){
            throw err;
        }
    })
}

//////////////////////////////////////////////////////Place order of selected cart item
exports.placeOrder = function(data, cartId, customerId){
    return new Promise((resolve) => {
        let trackId = Math.floor(Math.random() * 10000) + 1;
        const timeElapsed = Date.now();
        const today = new Date(timeElapsed);
        const placeDate = today.toDateString();
        let insertCmd = "INSERT INTO `order` (order_cart_id, order_tracking_id, order_customer_id, order_delivery_name, order_delivery_contact, order_delivery_address, order_delivery_city, order_delivery_state, order_place_date) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);"
        let insertQuery = customerDB.format(insertCmd, [cartId, trackId, customerId, data.name, data.contact, data.address, data.city, data.state, placeDate]);
        customerDB.query(insertQuery, (err, result)=>{
        if(err){
            throw err;
        } else{
            resolve(cartId)
        }
    });
    })
}

//////////////////////////////////////////////////////Delete selected order
exports.deleteOrder = function(id){
    let deleteQuery = "DELETE FROM `order` WHERE order_tracking_id = "+id;
    customerDB.query(deleteQuery, (err, result)=>{
        if(err){
            throw err;
        } else{
            console.log(result);
        }
    })
}

//////////////////////////////////////////////////////Searching order to check data duplication
exports.searchOrder = function(cartId){
    return new Promise((resolve) => {
        let searchQuery = "SELECT * FROM `order` WHERE order_cart_id = "+cartId;
        customerDB.query(searchQuery, (err, result)=>{
            if(err){
                throw err;
            } else{
                resolve(result)
            }
        })
    })
}

//////////////////////////////////////////////////////Order detail display
exports.orderDisplay = function(orderId){
    return new Promise((resolve)=>{
        let searchQuery = "SELECT * FROM `order` WHERE order_id = "+orderId;
        customerDB.query(searchQuery, (err, result)=>{
            if(err){
                throw err;
            } else{
                resolve(result);
            }
        })
    })
}









