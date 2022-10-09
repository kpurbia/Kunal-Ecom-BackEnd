const path = require('path');
const publicPath = path.join(__dirname, "..", "public");

module.exports = function(app){
    app.get("/vendor", (req, res)=>{
        res.sendFile(publicPath + "/homepage/vendorHome.html");
    });

    app.get("/user/productDetails", (req, res)=>{
        res.sendFile(publicPath + "/product.html");
    })
}
