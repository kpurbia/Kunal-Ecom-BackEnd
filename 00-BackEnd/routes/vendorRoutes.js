import VendorController from '../controllers/VendorController.js';
import UserServices from '../services/MySQL/UserServices.js';
import VendorServices from '../services/MySQL/VendorServices.js';

export default function(app){
    const userServices = new UserServices();
    const vendorServices = new VendorServices();
    const vendorController = new VendorController(userServices, vendorServices);

    app.route("/vendor/register").post(vendorController.registerVendor);
    app.route("/vendor/addProduct").post(vendorController.addProduct);
    app.route("/vendor/getProfile").get(vendorController.getVendorProfile);
    app.route("/vendor/updateProfile").post(vendorController.updateVendorProfile);
    app.route("/vendor/deleteProfile").delete(vendorController.deleteVendor);
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