import UserServices from '../services/MySQL/UserServices.js';
import CustomerServices from '../services/MySQL/CustomerServices.js';
import CustomerController from '../controllers/CustomerController.js';

export default function(app){
    const userServices = new UserServices();
    const customerServices = new CustomerServices();
    const customerController = new CustomerController(userServices, customerServices);

    app.route("/customer/register").post(customerController.registerCustomer);
    app.route("/cart").get(customerController.cartDisplay);
}

// module.exports = function(app){

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
// }