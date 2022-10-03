const adminController = require('../controllers/adminController');

module.exports = function(app){
    app.route("/admin/register").post(adminController.registerAdmin);
}