const customerController = require('../controllers/customerController');

module.exports = function(app){
    app.route("/customer").get((req, res)=>{
        res.send("<h1>Welcome customer</h1><h3>You can access our ecommerce using three ways:</h3><ul><li>If you want to explore our page, you can enter as a guest- ('http://localhost:3000/customer/guest')</li><li>If you want to create an account with us, you can register- ('http://localhost:3000/customer/register')</li><li>If you already have your account with us, you can login- ('http://localhost:3000/customer/login')</li></ul><h4>EXPLORE & ENJOY & DON'T FORGET TO BUY YOUR CHOICES BECAUSE WE KNOW YOUR CHOICE IS THE BEST</h4>")
    });

    app.route("/customer/guest").get(customerController.guestDisplay);

    app.route("/customer/register")
        .get(customerController.registerDetail)
        .post(customerController.registerCustomer);

    app.route("/customer/login")
        .get(customerController.loginDetail)
        .post(customerController.loginCustomer);
    
    app.route("/customer/login/:id")
        .get(customerController.customerDetail)
        .patch(customerController.updateDetail)
        .delete(customerController.deletecustomer);
    
    app.route("/customer/login/:id/product").get(customerController.productDisplay);

    app.route("/customer/login/:id/product/:productid")
        .get(customerController.productDetail)
        .post(customerController.addToCart);

    app.route("/customer/login/:id/cart")
        .get(customerController.cartDetail);
    
    app.route("/customer/login/:id/cart/:cartid")
        .get(customerController.cartItemDetail)
        .delete(customerController.removeItem);

    app.route("/customer/login/:id/cart/:cartid/order")
        .get(customerController.detailsForOrder)
        .post(customerController.placeOrder);

    app.route("/customer/login/:id/order").get(customerController.getAllOrders);
    
    app.route("/customer/login/:id/order/:orderid")
        .get(customerController.getOrderDetail)
        .delete(customerController.deleteOrder);
}