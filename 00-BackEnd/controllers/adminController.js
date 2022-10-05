const adminDML = require('../models/adminDML');
const userDML = require('../models/userDML');



//////////////////////////////////////////////////////Registering admin
exports.registerAdmin = async function(req, res){
    console.log("Can you see me");
    let adminData = req.body;
    let role = "Admin"
    if(adminData.password == adminData.password2){
        userDML.register(adminData, role)
        let checkUser = await userDML.checkUser(adminData);
        let userId = checkUser[0].user_id
        if(checkUser.length == 1){
            adminDML.register(adminData, userId);
            let checkAdmin = await adminDML.checkAdmin(adminData);
            if(checkAdmin.length <= 1){
                res.send("Registered");
            } else{
                userDML.removegovtid(checkUser);
                adminDML.remove(checkAdmin);
                res.send("Govt id already registered");
            }
        } else{
            userDML.remove(checkUser);
            res.send("Email already registered");
        }

    } else {
        res.send("Admin/registerAdmin")
    }
}