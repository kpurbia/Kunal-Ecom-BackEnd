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

    //////////////////////////////////////////////////////Display single vendor's all products uploaded
    getVendorProducts = async (req, res) =>{
        if(req.session){
                console.log(req.header);
                console.log(req.header("Authorization"));
                let token = req.header("Authorization");
                console.log(token);
                let decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
                if(decodedToken.role === "Vendor"){
                    let vendorId = decodedToken.userId;
                    let vendorAllProduct = await this.productManager.getVendorsProduct(vendorId);
                    res.status(200).send(vendorAllProduct);
                }
        } else{
            req.session.destroy();
            res.status(400).send("Session Expired");
        }
    }
}