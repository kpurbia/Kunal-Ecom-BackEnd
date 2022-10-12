export default class AdminController {

    //////////////////////////////////////////////////////Creating Dependency Injection
    constructor(adminMgr, userMgr){
        this.adminManager = adminMgr;
        this.userManager = userMgr;
    }

    //////////////////////////////////////////////////////Registering admin
    registerAdmin = async (req, res) => {
        let adminData = req.body;
        let role = "Admin"
        this.userManager.register(adminData, role)
        let checkUser = await this.userManager.checkUser(adminData);
        let userId = checkUser[0].user_id
        if (checkUser.length == 1) {
            this.adminManager.register(adminData, userId);
            let checkAdmin = await this.adminManager.checkAdmin(adminData);
            if (checkAdmin.length <= 1) {
                res.send("success");
            } else {
                this.userManager.removegovtid(checkUser);
                this.adminManager.remove(checkAdmin);
                res.send("Id already registered");
            }
        } else {
            this.userManager.remove(checkUser);
            res.send("Email already registered");
        }
    }
}
