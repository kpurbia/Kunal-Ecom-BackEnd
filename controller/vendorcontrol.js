const vendorDB = require('../model/vendordb');
let vendor_id;

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
    let vendorData = req.body;
    let vendorDetail = await vendorDB.login(vendorData);
    // console.log(vendorDetail);
    if(vendorDetail.length == 0){
        res.send("Incorrect login details");
    } else{
        vendor_id = vendorDetail[0].vendor_id;
        // console.log(vendor_id);
        res.send("<h1>Welcome, "+vendorDetail[0].vendor_name+ "</h1><h3>Your id for further use is "+vendor_id+"</h3><p>Use '/vendor/login/:id/product' to view your uploaded products or upload your new product to sell</p>");
    }
}

exports.vendor_product_display = async function(req, res){
    let vendor_login_id = req.params.id;
    console.log(vendor_id);
    if(vendor_id == vendor_login_id){
        let vendor_product = await vendorDB.vendor_product_display(vendor_login_id);
        res.send(vendor_product);
    } else{
        res.send("Use your correct id or login again to your get your id");
    }
}