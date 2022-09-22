const vendorcontrol = require('../controller/vendorcontrol');

module.exports = function(app){
    app.route("/vendor").get((req, res)=>{
        res.send('<h1>Welcome Vendor</h1><h3>You can join our ecommerce as our product vendors:</h3><ul><li>If you do not have your account with us, please register- ("/vendor/register")</li><li>If you already have your account with us, you can login- ("/vendor/login")</li></ul><h4>EXPLORE & ENJOY</h4>')
    });

    app.route("/vendor/register")
        .get(vendorcontrol.registerDetail)
        .post(vendorcontrol.register);
    
    app.route("/vendor/login")
        .get(vendorcontrol.loginDetail)
        .post(vendorcontrol.login);

}