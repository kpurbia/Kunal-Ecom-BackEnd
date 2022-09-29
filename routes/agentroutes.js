const agentController = require('../controllers/agentControllerler');

module.exports = function(app){
    app.route("/agent").get((req, res)=>{
        res.send('<h1>Welcome Agent</h1><h3>You can join our ecommerce as our delivery partner:</h3><ul><li>If you do not have your account with us, please register- ("http://localhost:3000/agent/register")</li><li>If you already have your account with us, you can login- ("http://localhost:3000/agent/login")</li></ul><h4>REMEMBER PARTNERS NEVER CHEAT AND THEY ALWAYS WORK HARD TOGETHER </h4>')
    });

    app.route("/agent/register")
        .get(agentController.registerDetail)
        .post(agentController.registerAgent);
    
    app.route("/agent/login")
        .get(agentController.loginDetail)
        .post(agentController.loginAgent);

    app.route("/agent/login/:id")
        .get(agentController.agentDetail)
        .patch(agentController.updateDetail)
        .delete(agentController.deleteAgent);

    app.route("/agent/login/:id/order").get(agentController.orderDisplay);

    app.route("/agent/login/:id/order/:orderid")
        .get(agentController.orderDetail)
        .post(agentController.addTrack);
    
    app.route("/agent/login/:id/track").get(agentController.fullTrackDisplay);

    app.route("/agent/login/:id/track/:trackid")
        .get(agentController.trackDetail)
        .patch(agentController.trackUpdate);   
}