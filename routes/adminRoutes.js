const adminController = require('../controllers/adminController');

module.exports = function(app){
    app.route("/admin/register")
        .get(adminController.registerDetail)
        .post(adminController.registerAdmin);
}