const userController = require('../controllers/userController');

module.exports = function(app){
    app.route("/").get(userController.home)
    
    app.route("/login").get(userController.login)
}