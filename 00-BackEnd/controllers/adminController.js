const adminDML = require('../models/adminDML');
const userDML = require('../models/userDML');



//////////////////////////////////////////////////////Registering admin
exports.registerAdmin = async function (req, res) {
    let adminData = req.body;
    let role = "Admin"
    userDML.register(adminData, role)
    let checkUser = await userDML.checkUser(adminData);
    let userId = checkUser[0].user_id
    if (checkUser.length == 1) {
        adminDML.register(adminData, userId);
        let checkAdmin = await adminDML.checkAdmin(adminData);
        if (checkAdmin.length <= 1) {
            res.send("success");
        } else {
            userDML.removegovtid(checkUser);
            adminDML.remove(checkAdmin);
            res.send("Id already registered");
        }
    } else {
        userDML.remove(checkUser);
        res.send("Email already registered");
    }
}