import AgentServices from '../services/MySQL/AgentServices.js';
import UserServices from '../services/MySQL/UserServices.js'
import AgentController from '../controllers/AgentController.js';

export default function(app){
    const agentServices = new AgentServices();
    const userServices = new UserServices();
    const agentController = new AgentController(agentServices, userServices)
    app.route("/agent/register").post(agentController.registerAgent);
}

// module.exports = function(app){
       
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
// }