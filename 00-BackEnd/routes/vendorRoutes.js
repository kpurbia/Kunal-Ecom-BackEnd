import VendorControl from '../controllers/VendorController.js';

const vendorControl = new VendorControl();

export default function(app){
    app.route("/vendor/register").post(vendorControl.registerVendor);
    app.route("/addProduct").post(vendorControl.addProduct);
    app.route("/vendor/getProfile").get(vendorControl.getVendorProfile);
    app.route("/vendor/updateProfile").post(vendorControl.updateVendorProfile);

}

// module.exports = function(app){

    // app.route("/addproduct").post(vendorControl.addProduct);
    
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
// }