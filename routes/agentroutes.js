const agentcontrol = require('../controller/agentcontrol');

module.exports = function(app){
    app.route("/agent").get((req, res)=>{
        res.send('<h1>Welcome Agent</h1><h3>You can join our ecommerce as our delivery partner:</h3><ul><li>If you do not have your account with us, please register- ("http://localhost:3000/agent/register")</li><li>If you already have your account with us, you can login- ("http://localhost:3000/agent/login")</li></ul><h4>REMEMBER PARTNERS NEVER CHEAT AND THEY ALWAYS WORK HARD TOGETHER </h4>')
    });

    app.route("/agent/register")
        .get(agentcontrol.registerDetail)
        .post(agentcontrol.registerAgent);
    
    app.route("/agent/login")
        .get(agentcontrol.loginDetail)
        .post(agentcontrol.loginAgent);

    app.route("/agent/login/:id")
        .get(agentcontrol.agentDetail)
        .patch(agentcontrol.updateDetail)
        .delete(agentcontrol.deleteAgent);

    app.route("/agent/login/:id/order").get(agentcontrol.orderDisplay);

    app.route("/agent/login/:id/order/:orderid")
        .get(agentcontrol.orderDetail)
        .post(agentcontrol.addTrack);
    
    app.route("/agent/login/:id/track").get(agentcontrol.fullTrackDisplay);

    app.route("/agent/login/:id/track/:trackid")
        .get(agentcontrol.trackDetail)
        .patch(agentcontrol.trackUpdate);   
}