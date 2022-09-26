const vendorcontrol = require('../controller/vendorcontrol');

module.exports = function(app){
    app.route("/vendor").get((req, res)=>{
        res.send('<h1>Welcome Vendor</h1><h3>You can join our ecommerce as our product vendors:</h3><ul><li>If you do not have your account with us, please register- ("http://localhost:3000/vendor/register")</li><li>If you already have your account with us, you can login- ("http://localhost:3000/vendor/login")</li></ul><h4>USE OUR ECOMMERCE AS A WAY TO GROW AND EXPAND YOUR BUSINESS MORE</h4>')
    });

    app.route("/vendor/register")
        .get(vendorcontrol.registerDetail)
        .post(vendorcontrol.registerVendor);
    
    app.route("/vendor/login")
        .get(vendorcontrol.loginDetail)
        .post(vendorcontrol.loginVendor);

    app.route("/vendor/login/:id")
        .get(vendorcontrol.vendorDetail)
        .patch(vendorcontrol.updateDetail)
        .delete(vendorcontrol.deleteVendor);

    app.route("/vendor/login/:id/product")
        .get(vendorcontrol.productDisplay)
        .post(vendorcontrol.addProduct)
        .patch(vendorcontrol.updateProduct)
        .delete(vendorcontrol.deleteProduct);
}