import ProductServices from '../services/MySQL/ProductServices.js';
import ProductController from "../controllers/ProductController.js";

export default function(app){
    const productServices = new ProductServices();
    const productController = new ProductController(productServices);
    app.route("/productsDisplay").get(productController.getProducts);
    app.route("/productDetails").post(productController.getProductDetail);
    app.route("/cart").post(productController.addToCart);
    app.route("/vendor/vendorProducts").get(productController.getVendorProducts);
}