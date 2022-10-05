const userController = require('../controllers/userController');

module.exports = function(app){
    
    app.route("/login").post(userController.login);
}