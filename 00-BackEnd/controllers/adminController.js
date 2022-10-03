const adminDML = require('../models/adminDML');
const userDML = require('../models/userDML');
const alert = require('alert');

//////////////////////////////////////////////////////Display of details required for registration
exports.registerDetail = function(req, res){
    res.render("admin/registerAdmin");
}

//////////////////////////////////////////////////////Registering admin
exports.registerAdmin = async function(req, res){
    let adminData = req.body;
    let role = "Admin"
    if(adminData.password == adminData.password2){
        userDML.register(adminData, role)
        let checkUser = await userDML.checkUser(adminData);
        let userId = checkUser[0].user_id
        if(checkUser.length == 1){
            adminDML.register(adminData, userId);
            let checkAdmin = await adminDML.checkAdmin(adminData);
            if(checkAdmin.length == 1){
                alert("Your account is registered, login and explore");
                res.render("login");
            } else{
                userDML.removegovtid(checkUser);
                adminDML.remove(checkAdmin);
                alert("Your company id is already in use, please check");
                res.render("login");
            }
        } else{
            userDML.remove(checkUser);
            alert("Your email is already in use, try login");
            res.render("login");
        }

    } else {
        alert("Password do not match, try again");
        res.render("admin/registerAdmin")
    }
}