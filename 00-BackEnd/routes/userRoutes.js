import UserController from '../controllers/UserController.js';

const userController = new UserController();

export default function(app){
    app.route("/login").post(userController.userLogin);
}