import target from './dbServer/dbserver.js';

export default class CustomerServices{
    register = (id) =>{
        return new Promise((resolve) => {
            let registerQuery = "INSERT INTO customers (customer_user_id) VALUES (?);"
            let registerData = target.format(registerQuery, [id]);
            target.query(registerData, (err, result)=>{
                if(err){
                    throw err;
                }
            })
        })
    }
}






// //////////////////////////////////////////////////////Login of customer
// exports.login = function(data){
//     return new Promise((resolve)=>{
//         let searchCmd = "SELECT * FROM customer WHERE customer_email = ? AND customer_password = ?"
//         let searchQuery = target.format(searchCmd, [data.email, data.password])
//         target.query(searchQuery, (err, result)=>{
//             if(err){
//                 throw err;
//             } else{
//                 resolve(result);
//             }
//         })
//     })
// }

// //////////////////////////////////////////////////////Customer fetching own details after login
// exports.searchcustomer = function(id){
//     return new Promise((resolve) => {
//         let searchQuery = "SELECT * FROM customer WHERE customer_id = "+id;
//         target.query(searchQuery, (err, result)=>{
//             if(err){
//                 throw err;
//             } else{
//                 resolve(result);
//             }
//         })
//     })
// }

// //////////////////////////////////////////////////////Customer updating own data stored in account
// exports.updatecustomer = function(data, id){
//     let updateQuery = "UPDATE customer SET customer_name = '"+data.name+"', customer_email= '"+data.email+"', customer_password = '"+data.password+"', customer_contact = '"+data.contact+"', customer_state = '"+data.state+"', customer_city = '"+data.city+"' WHERE customer_id =" +id;
//     target.query(updateQuery, (err, result)=>{
//         if(err){
//             throw err;
//         }
//     })  
// }

// //////////////////////////////////////////////////////Customer deleting own account
// exports.deletecustomer = function(id){
//     let deleteQuery = "DELETE FROM customer WHERE customer_id = "+id;
//     target.query(deleteQuery, (err, result)=>{
//         if(err){
//             throw err;
//         }
//     })
// }

// //////////////////////////////////////////////////////Displaying all products to customer after successful login
// exports.allProductDisplay = function(){
//     return new Promise((resolve) => {
//         let searchQuery = "SELECT product.product_id, product.product_name, product.product_price, vendor.vendor_name FROM `product` INNER JOIN `vendor` ON product.product_vendor_id = vendor.vendor_id";
//         target.query(searchQuery, (err, result)=>{
//             if(err){
//                 throw err;
//             } else{
//                 // console.log(result);
//                 resolve(result);
//             }
//         })

//     })
// }

// //////////////////////////////////////////////////////Displaying single product with full details for customer to add in their cart
// exports.productDisplay = function(product_id){
//     return new Promise((resolve) => {
//         let searchQuery = "SELECT * FROM product WHERE product_id = "+product_id;
//         target.query(searchQuery, (err, result)=>{
//             if(err){
//                 throw err;
//             } else{
//                 resolve(result);
//             }
//         })
//     })
// }

// //////////////////////////////////////////////////////Adding product to cart using post
// exports.addToCart = function(product_id, customerId, productQuantity){
//     let insertCmd = "INSERT INTO cart (cart_product_id, cart_customer_id, cart_product_quantity) VALUES (?, ?, ?)";
//     let insertQuery = target.format(insertCmd, [product_id, customerId, productQuantity]);
//     target.query(insertQuery, (err, resut)=>{
//         if(err){
//             throw err;
//         }
//     })
// }

// //////////////////////////////////////////////////////Searching item in cart
// exports.searchItem = function(customerId, productId){
//     return new Promise((resolve) => {
//         let searchQuery = "SELECT * FROM cart WHERE cart_customer_id = "+customerId+" AND cart_product_id = "+productId;
//         target.query(searchQuery, (err, result)=>{
//             if(err){
//                 throw err;
//             } else{
//                 // console.log("Inside result");
//                 // console.log(result);
//                 resolve(result)
//             }
//         })
//     })
// }

// //////////////////////////////////////////////////////Removing duplicate item in cart
// exports.removeItem = function(data) {
//     let removeQuery = "DELETE FROM cart WHERE cart_id = "+data[1].cart_id;
//     target.query(removeQuery, (err, result)=>{
//         if(err){
//             throw err;
//         }
//     })
// }

// //////////////////////////////////////////////////////Display all cart items
// exports.cartDisplay = function (id) {
//     return new Promise((resolve) => {
//         let displayQuery = "SELECT * FROM cart WHERE cart_customer_id = "+id;
//         target.query(displayQuery, (err, result)=>{
//             if(err){
//                 throw err;
//             } else{
//                 resolve(result);
//             }
//         })
//     })
    
// }

// //////////////////////////////////////////////////////Display selected cart item
// exports.cartItemDisplay = function(cartid){
//     return new Promise((resolve)=>{
//         let displayQuery = "SELECT * FROM cart WHERE cart_id = "+cartid;
//         target.query(displayQuery, (err, result)=>{
//             if(err){
//                 throw err;
//             } else{
//                 resolve(result);
//             }
//         })
//     });
// }

// //////////////////////////////////////////////////////Remove selected cart item or cart item placed for order
// exports.removeCartItem = function(cartId){
//     let deleteItemQuery = "DELETE FROM cart WHERE cart_id = "+cartId;
//     target.query(deleteItemQuery, (err, result)=>{
//         if(err){
//             throw err;
//         }
//     })
// }

// //////////////////////////////////////////////////////Place order of selected cart item
// exports.placeOrder = function(data, cartId, customerId){
//     return new Promise((resolve) => {
//         let trackId = Math.floor(Math.random() * 10000) + 1;
//         const timeElapsed = Date.now();
//         const today = new Date(timeElapsed);
//         const placeDate = today.toDateString();
//         let insertCmd = "INSERT INTO `order` (order_cart_id, order_tracking_id, order_customer_id, order_delivery_name, order_delivery_contact, order_delivery_address, order_delivery_city, order_delivery_state, order_place_date) VALUES (?, ?, ?, ?, ?, ?, ?, ?);"
//         let insertQuery = target.format(insertCmd, [cartId, trackId, customerId, data.name, data.contact, data.address, data.city, data.state, placeDate]);
//         target.query(insertQuery, (err, result)=>{
//         if(err){
//             throw err;
//         } else{
//             resolve(cartId)
//         }
//     });
//     })
// }

// //////////////////////////////////////////////////////Searching order to check data duplication
// exports.searchOrder = function(cartId){
//     return new Promise((resolve) => {
//         let searchQuery = "SELECT * FROM `order` WHERE order_cart_id = "+cartId;
//         target.query(searchQuery, (err, result)=>{
//             if(err){
//                 throw err;
//             } else{
//                 resolve(result)
//             }
//         })
//     })
// }

// //////////////////////////////////////////////////////Display of all order using customer id
// exports.allOrders = function(customerId){
//     return new Promise((resolve) => {
//         let searchQuery = "SELECT * FROM `order` WHERE order_customer_id = "+customerId;
//         target.query(searchQuery, (err, result)=>{
//             if(err){
//                 throw err;
//             } else{
//                 resolve(result);
//             }
//         })
//     })
// }

// //////////////////////////////////////////////////////Order detail display
// exports.orderDisplay = function(orderId){
//     return new Promise((resolve)=>{
//         let searchQuery = "SELECT * FROM `order` WHERE order_id = "+orderId;
//         target.query(searchQuery, (err, result)=>{
//             if(err){
//                 throw err;
//             } else{
//                 resolve(result);
//             }
//         })
//     })
// }


// //////////////////////////////////////////////////////Delete selected order
// exports.deleteOrder = function(orderId){
//     let updateQuery = "UPDATE `order` SET order_status = 'cancelled' WHERE order_id = "+orderId;
//     target.query(updateQuery, (err, result)=>{
//         if(err){
//             throw err;
//         }
//     })
// }






