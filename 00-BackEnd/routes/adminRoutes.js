import AdminController from '../controllers/AdminController.js';

const adminController = new AdminController();

export default function(app){
    app.route("/admin/register").post(adminController.registerAdmin);
}