import AdminDML from '../models/AdminDML.js';
import UserDML from '../models/UserDML.js';

const adminDML = new AdminDML();
const userDML = new UserDML();

//////////////////////////////////////////////////////Registering admin
export default class AdminController {
    async registerAdmin(req, res) {
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
}
