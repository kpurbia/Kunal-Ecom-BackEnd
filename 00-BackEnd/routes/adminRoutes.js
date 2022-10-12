import AdminServices from '../services/MySQL/AdminServices.js';
import UserServices from '../services/MySQL/UserServices.js';
import AdminController from '../controllers/AdminController.js';

export default function(app){
    const adminServices = new AdminServices();
    const userServices = new UserServices();
    const adminController = new AdminController(adminServices, userServices);
    app.route("/admin/register").post(adminController.registerAdmin);
}