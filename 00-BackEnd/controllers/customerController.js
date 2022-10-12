import CustomerDML from '../services/MySQL/CustomerServices.js';
import UserServices from '../services/MySQL/UserServices.js'
import jwt from 'jsonwebtoken';

export default class Customer {

    //////////////////////////////////////////////////////Creating Dependency Injection
    constructor(userMgr, customerMgr){
        this.customerManager = customerMgr;
        this.userManager = userMgr;
    }

    //////////////////////////////////////////////////////Registering customer
    registerCustomer = async (req, res) => {
        let customerData = req.body;
        let role = "Customer"
        this.userManager.register(customerData, role)
        let checkUser = await this.userManager.checkUser(customerData);
        let userId = checkUser[0].user_id
        if (checkUser.length == 1) {
            this.customerManager.register(userId);
            res.send("success");
        } else {
            this.userManager.remove(checkUser);
            res.send("Email already registered");
        }
    }

    //////////////////////////////////////////////////////
    cartDisplay = (req, res) => {
        console.log("Wait");
    }

}




// exports.loginCustomer = async function (req, res) {
//     let customerData = req.body;
//     let customerDetail = await customerDML.login(customerData);
//     // console.log(customerDetail);
//     if (customerDetail.length == 0) {
//         res.send("<h1>Incorrect login details</h1>");
//     } else {
//         customer_id = customerDetail[0].customer_id;
//         // console.log(customer_id);
//         res.send("<h1>Welcome, " + customerDetail[0].customer_name + "</h1><h3>Your id for further use is " + customer_id + "</h3>");
//     }
// }


// //////////////////////////////////////////////////////After login-- display customer data
// exports.customerDetail = async function (req, res) {
//     let customerId = req.params.id;
//     // console.log(customer_id);
//     // console.log(customerId);
//     if (customer_id == customerId) {
//         let customerDetail = await customerDML.searchcustomer(customerId);
//         customerDetail = JSON.stringify(customerDetail);
//         res.send(customerDetail);
//     } else {
//         res.send("<h1>Login details do not match, login again</h1>");
//     }
// }

// //////////////////////////////////////////////////////After login-- update customer data
// exports.updateDetail = async function (req, res) {
//     let customerData = req.body;
//     // console.log(customerData.id);
//     // console.log(customer_id);
//     if (customerData.id == customer_id) {
//         customerDML.updatecustomer(customerData, customer_id);
//         let customerDetail = await customerDML.searchcustomer(customerData.id);
//         customerDetail = JSON.stringify(customerDetail);
//         res.send("<h1>Your details are updated, New details are--</h1>" + customerDetail);
//     } else {
//         res.send("<h1>Data not found, login again</h1>");
//     }
// }

// //////////////////////////////////////////////////////After login-- delete customer data
// exports.deletecustomer = function (req, res) {
//     let customerId = req.params.id;
//     if (customer_id == customerId) {
//         customerDML.deletecustomer(customerId);
//         res.send("<h1>Your account is deleted</h1>")
//     } else {
//         res.send("<h1>You are not logged in, login again</h1>")
//     }
// }


// //////////////////////////////////////////////////////After login-- display of all products
// exports.productDisplay = async function (req, res) {
//     let customerId = req.params.id;
//     if (customer_id == customerId) {
//         let products = await customerDML.allProductDisplay();
//         res.send(products);
//     } else {
//         res.send("<h1>Session expired, login again</h1>")
//     }
// }


// //////////////////////////////////////////////////////After login- display of full product detail using product_id
// exports.productDetail = async function (req, res) {
//     let customerId = req.params.id;
//     let productId = req.params.productid;
//     if (customerId == customer_id) {
//         let productDetail = await customerDML.productDisplay(productId);
//         productDetail = JSON.stringify(productDetail);
//         res.send(productDetail + "<h1>To add this product to cart, add quantity of products you want to buy in body</h1>");
//     } else {
//         res.send("<h1>Session expired, login again</h1>");
//     }
// }


// //////////////////////////////////////////////////////After login- add selected product to cart
// exports.addToCart = async function (req, res) {
//     let customerId = req.params.id;
//     let productId = req.params.productid;
//     let productQuantity = req.body.quantity;
//     if (customerId == customer_id) {
//         customerDML.addToCart(productId, customerId, productQuantity);
//         let searchItem = await customerDML.searchItem(customerId, productId);
//         if (searchItem.length == 1) {
//             searchItem = JSON.stringify(searchItem)
//             res.send("<h1>Product added to cart</h1>" + searchItem);
//         } else {
//             // console.log(searchItem);
//             customerDML.removeItem(searchItem);
//             let cartDisplay = await customerDML.cartDisplay(customerId);
//             cartDisplay = JSON.stringify(cartDisplay);
//             res.send("<h1>Product is already inside cart, check your cart and place order</h1><h3>Or if you want to update or delete your cart item, use respective cart id</h3>" + cartDisplay);
//         }

//     } else {
//         res.send("<h1>Session expired, login again</h1>");
//     }
// }

// //////////////////////////////////////////////////////After adding product to cart- display all cart items
// exports.cartDetail = async function (req, res) {
//     let customerId = req.params.id;
//     if (customerId == customer_id) {
//         let cartDisplay = await customerDML.cartDisplay(customerId);
//         cartDisplay = JSON.stringify(cartDisplay);
//         res.send("<h1>Select any cart id and place order</h1>" + cartDisplay);
//     } else {
//         res.send("<h1>Session expired, login again</h1>");
//     }
// }

// //////////////////////////////////////////////////////After adding product to cart- display single item in cart
// exports.cartItemDetail = async function (req, res) {
//     let cartId = req.params.cartid;
//     let customerId = req.params.id;
//     if (customerId == customer_id) {
//         let cartItemDisplay = await customerDML.cartItemDisplay(cartId);
//         // console.log(cartItemDisplay);
//         cartItemDisplay = JSON.stringify(cartItemDisplay);
//         res.send("<h1>To order this item in cart use cart id and place order</h1>" + cartItemDisplay);
//     } else {
//         res.send("<h1>Session expired, login again</h1>");
//     }
// }

// //////////////////////////////////////////////////////After adding product to cart- removing single item from cart
// exports.removeItem = function (req, res) {
//     let cartId = req.params.cartid;
//     let customerId = req.params.id;
//     if (customerId == customer_id) {
//         customerDML.removeCartItem(cartId);
//         res.send("Item removed from cart");
//     } else {
//         res.send("<h1>Session expired, login again</h1>");
//     }
// }

// //////////////////////////////////////////////////////Checking all required details to place order
// exports.detailsForOrder = function (req, res) {
//     res.send("<h2>Details of reciever required to place order:</h2><ul><li>Name</li><li>Contact</li><li>Address</li><li>City</li><li>State</li></ul>");
// }


// //////////////////////////////////////////////////////After selecting cart- Placing Order
// exports.placeOrder = async function (req, res) {
//     let cartId = req.params.cartid;
//     let customerId = req.params.id;
//     let orderDetail = req.body;
//     if (customerId == customer_id) {
//         let cartIdReturn = await customerDML.placeOrder(orderDetail, cartId, customerId);
//         if (cartIdReturn != null || cartIdReturn != undefined || cartIdReturn != 0) {
//             let similarOrder = await customerDML.searchOrder(cartIdReturn);
//             let lastOrder = similarOrder[similarOrder.length - 1]
//             // console.log(lastOrder);
//             res.send("<h1>Your order is placed successfully</h1><ul><li>Your order id: " + lastOrder.order_id + "</li><li>Your tracking id: " + lastOrder.order_tracking_id + "</li></ul>");
//         } else {
//             res.send("<h1>Error occured, TRY AGAIN</h1>")
//         }
//     } else {
//         res.send("<h1>Session expired, login again</h1>");
//     }
// }

// //////////////////////////////////////////////////////Display all orders placed
// exports.getAllOrders = async function (req, res) {
//     let customerId = req.params.id;
//     // console.log(customer_id);
//     if (customerId == customer_id) {
//         let allOrders = await customerDML.allOrders(customerId);
//         if (allOrders.length == 0) {
//             res.send("<h1>No orders placed yet, check your cart and place order</h1>")
//         } else {
//             res.send(allOrders);
//         }
//     } else {
//         res.send("<h1>Session expired, login again</h1>");
//     }
// }


// //////////////////////////////////////////////////////After placing order- Checking Order Details
// exports.getOrderDetail = async function (req, res) {
//     let customerId = req.params.id;
//     let orderId = req.params.orderid;
//     if (customerId == customer_id) {
//         let orderDisplay = await customerDML.orderDisplay(orderId)
//         res.send(orderDisplay);
//     } else {
//         res.send("<h1>Session expired, login again</h1>");
//     }
// }

// //////////////////////////////////////////////////////After placing order- cancelling or deleteing order
// exports.deleteOrder = function (req, res) {
//     let customerId = req.params.id;
//     let orderId = req.params.orderid;
//     if (customerId == customer_id) {
//         customerDML.deleteOrder(orderId);
//         res.send("<h1>Order deleted successfully.</h1>")
//     } else {
//         res.send("<h1>Session expired, login again</h1>");
//     }
// }

// //////////////////////////////////////////////////////Tracking order using orderid and trackid
