const vendorDB = require('../model/vendordb');

exports.registerDetail = function(req, res){
    res.send("<h3>Hello vendor, welcome to registration page, follow the instructions given below</h3><p>Fill all the required details and press send</p><h5>Details required for registering your account as a vendor</h5><ul><li>Company Name</li><li>GovtId</li><li>Email</li><li>Password</li><li>Confirm Password</li><li>Product Category (if any specific)</li><li>State</li><li>City</li></ul>");
}

exports.register = async function(req, res){
    let vendorData = req.body;
    if(vendorData.password == vendorData.conpassword){
        let vendor = await vendorDB.register(vendorData);
        // console.log(vendor.id);
        res.send("Your account is registered, " +vendor.email);
        
        /*
        //Will try checking id and removing duplicate id
        if(vendor.govtid != vendorData.govtid){
            console.log("Inside if");
            vendorDB.remove(vendor.govtid);
            res.send("Your company is already registered.");
        } else{
            
        }*/

    } else {
        res.send("Password dont not match")
    }
}

exports.loginDetail = function(req, res){
    res.send("<h3>Hello vendor, welcome to login page, please be ready with the following details to login to your account</h3><ul><li>Email</li><li>Password</li><li>GovtId</li></ul>");
}

exports.login = async function(req, res){
    let userData = req.body;
    let userDetail = await vendorDB.login(userData);
    if(userDetail.length == 0){
        res.send("Incorrect login details");
    } else{
        // res.send("<h1>Welcome, "+userData.email+ "</h1><p>Use '/vendor/login/product' to view your uploaded products or upload your new product to sell</p>");
        res.redirect("/vendor");
    }
}