const vendorControl = require('../controllers/vendorController');

module.exports = function(app){

    app.route("/vendor/register")
        .get(vendorControl.registerDetail)
        .post(vendorControl.registerVendor);
    
    // app.route("/vendor/login/:id")
    //     .get(vendorControl.vendorDetail)
    //     .patch(vendorControl.updateDetail)
    //     .delete(vendorControl.deleteVendor);

    // app.route("/vendor/login/:id/product")
    //     .get(vendorControl.productDisplay)
    //     .post(vendorControl.addProduct);
    
    // app.route("/vendor/login/:id/product/:productid")
    //     .get(vendorControl.productDetail)
    //     .patch(vendorControl.updateProduct)
    //     .delete(vendorControl.deleteProduct);
}