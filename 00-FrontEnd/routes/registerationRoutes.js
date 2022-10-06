const path = require('path');
const publicPath = path.join(__dirname, "..", "public");

module.exports = function(app){
    app.get("/customer/register", (req, res)=>{
        res.sendFile(publicPath + '/registration/registerCustomer.html');
    });
    app.get("/vendor/register", (req, res)=>{
        res.sendFile(publicPath + '/registration/registerVendor.html');
    });
    app.get("/agent/register", (req, res)=>{
        res.sendFile(publicPath + '/registration/registerAgent.html');
    });
    app.get("/admin/register", (req, res)=>{
        res.sendFile(publicPath + '/registration/registerAdmin.html');
    });
}