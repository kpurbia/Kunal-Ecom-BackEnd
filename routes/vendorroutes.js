const vendorControl = require('../controller/vendorControl');

module.exports = function(app){
    app.route("/vendor").get((req, res)=>{
        res.send('<h1>Welcome Vendor</h1><h3>You can join our ecommerce as our product vendors:</h3><ul><li>If you do not have your account with us, please register- ("http://localhost:3000/vendor/register")</li><li>If you already have your account with us, you can login- ("http://localhost:3000/vendor/login")</li></ul><h4>USE OUR ECOMMERCE AS A WAY TO GROW AND EXPAND YOUR BUSINESS MORE</h4>')
    });

    app.route("/vendor/register")
        .get(vendorControl.registerDetail)
        .post(vendorControl.registerVendor);
    
    app.route("/vendor/login")
        .get(vendorControl.loginDetail)
        .post(vendorControl.loginVendor);

    app.route("/vendor/login/:id")
        .get(vendorControl.vendorDetail)
        .patch(vendorControl.updateDetail)
        .delete(vendorControl.deleteVendor);

    app.route("/vendor/login/:id/product")
        .get(vendorControl.productDisplay)
        .post(vendorControl.addProduct);
    
    app.route("/vendor/login/:id/product/:productid")
        .get(vendorControl.productDetail)
        .patch(vendorControl.updateProduct)
        .delete(vendorControl.deleteProduct);
}