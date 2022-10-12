import jwt from 'jsonwebtoken';

export default class ProductController {

    //////////////////////////////////////////////////////Creating Dependency Injection
    constructor(mgr){
        this.productManager = mgr;
    }

    //////////////////////////////////////////////////////Get all products to display
     getProducts = async (req, res)=> {
        let allProducts = await this.productManager.getProducts();
        res.send(allProducts);
    }

    //////////////////////////////////////////////////////Checking and displaying product details to user
    getProductDetail= async (req, res) => {
        let productId = req.body.id;
        let productDetail = await this.productManager.productDetail(productId);
        res.status(200).send(productDetail[0]);
    }

    //////////////////////////////////////////////////////Checking Add to cart only for customers
    addToCart = (req, res) => {
        let token = req.header("Authorization");
        let decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
        if (decodedToken.role === "Customer") {
            res.status(200).send("Customer");
        } else {
            res.status(200).send("Not Customer");
        }
    }
}