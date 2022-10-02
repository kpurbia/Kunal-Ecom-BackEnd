const customerController = require('../controllers/customerController');

module.exports = function(app){

    app.route("/customer/register")
        .get(customerController.registerDetail)
        .post(customerController.registerCustomer);

    // app.route("/customer/login")
    //     .get(customerController.loginDetail)
    //     .post(customerController.loginCustomer);
    
    // app.route("/customer/login/:id")
    //     .get(customerController.customerDetail)
    //     .patch(customerController.updateDetail)
    //     .delete(customerController.deletecustomer);
    
    // app.route("/customer/login/:id/product").get(customerController.productDisplay);

    // app.route("/customer/login/:id/product/:productid")
    //     .get(customerController.productDetail)
    //     .post(customerController.addToCart);

    // app.route("/customer/login/:id/cart")
    //     .get(customerController.cartDetail);
    
    // app.route("/customer/login/:id/cart/:cartid")
    //     .get(customerController.cartItemDetail)
    //     .delete(customerController.removeItem);

    // app.route("/customer/login/:id/cart/:cartid/order")
    //     .get(customerController.detailsForOrder)
    //     .post(customerController.placeOrder);

    // app.route("/customer/login/:id/order").get(customerController.getAllOrders);
    
    // app.route("/customer/login/:id/order/:orderid")
    //     .get(customerController.getOrderDetail)
    //     .delete(customerController.deleteOrder);
}