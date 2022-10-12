import UserServices from '../services/MySQL/UserServices.js'
import UserController from '../controllers/UserController.js';

export default function(app){
    const userServices = new UserServices();
    const userController = new UserController(userServices);
    app.route("/login").post(userController.userLogin);
}