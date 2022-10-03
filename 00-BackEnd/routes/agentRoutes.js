const agentController = require('../controllers/agentController');

module.exports = function(app){
    app.route("/agent/register").post(agentController.registerAgent);
    
    // app.route("/agent/login")
    //     .get(agentController.loginDetail)
    //     .post(agentController.loginAgent);

    // app.route("/agent/login/:id")
    //     .get(agentController.agentDetail)
    //     .patch(agentController.updateDetail)
    //     .delete(agentController.deleteAgent);

    // app.route("/agent/login/:id/order").get(agentController.orderDisplay);

    // app.route("/agent/login/:id/order/:orderid")
    //     .get(agentController.orderDetail)
    //     .post(agentController.addTrack);
    
    // app.route("/agent/login/:id/track").get(agentController.fullTrackDisplay);

    // app.route("/agent/login/:id/track/:trackid")
    //     .get(agentController.trackDetail)
    //     .patch(agentController.trackUpdate);   
}