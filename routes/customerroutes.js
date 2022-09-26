const customercontrol = require('../controller/customercontrol');

module.exports = function(app){
    app.route("/customer").get((req, res)=>{
        res.send("<h1>Welcome customer</h1><h3>You can access our ecommerce using three ways:</h3><ul><li>If you want to explore our page, you can enter as a guest- ('http://localhost:3000/customer/guest')</li><li>If you want to create an account with us, you can register- ('http://localhost:3000/customer/register')</li><li>If you already have your account with us, you can login- ('http://localhost:3000/customer/login')</li></ul><h4>EXPLORE & ENJOY & DON'T FORGET TO BUY YOUR CHOICES BECAUSE WE KNOW YOUR CHOICE IS THE BEST</h4>")
    });

    app.route("/customer/guest").get(customercontrol.guestDisplay);

    app.route("/customer/register")
        .get(customercontrol.registerDetail)
        .post(customercontrol.registerCustomer);

    app.route("/customer/login")
        .get(customercontrol.loginDetail)
        .post(customercontrol.loginCustomer);
    
    app.route("/customer/login/:id")
        .get(customercontrol.customerDetail)
        .patch(customercontrol.updateDetail)
        .delete(customercontrol.deletecustomer);
    
    app.route("/customer/login/:id/product").get(customercontrol.productDisplay);

    app.route("/customer/login/:id/product/:productid")
        .get(customercontrol.productDetail)
        .post(customercontrol.addToCart);

    app.route("/customer/login/:id/cart")
        .get(customercontrol.cartDetail);
    
    app.route("/customer/login/:id/cart/:cartid")
        .get(customercontrol.cartItemDetail)
        .delete(customercontrol.removeItem);

    app.route("/customer/login/:id/cart/:cartid/order")
        .get(customercontrol.detailsForOrder)
        .post(customercontrol.placeOrder);
    
    app.route("/customer/login/:id/order/:orderid").get(customercontrol.getOrderDetail);
}