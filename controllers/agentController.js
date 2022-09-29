const agentDML = require('../models/agentDML');
let agent_id;

//////////////////////////////////////////////////////Display of details required for registration
exports.registerDetail = function(req, res){
    res.send("<h3>Hello delivery partner, welcome to registration page, follow the instructions given below</h3><p>Fill all the required details and press send</p><p><b>Details required for registering your account as our delivery partner</b></p><ul><li>Name</li><li>Email</li><li>Password</li><li>Confirm Password</li><li>Govt Id</li><li>Contact</li><li>State</li><li>City</li></ul>");
}

//////////////////////////////////////////////////////Registering Agent
exports.registerAgent = async function(req, res){
    let agentData = req.body;
    if(agentData.password == agentData.conpassword){
        let agent = await agentDML.register(agentData);
        // console.log(agent);
        let checkagent = await agentDML.checkagent(agentData);
        // console.log(checkagent);
        if(checkagent.length == 1){
            res.send("<h1>Your account is registered, " +agent.name+"</h1><h3>Login your account using-- http://localhost:300/agent/login</h3>");
        } else{
            // console.log("Inside else");
            agentDML.remove(checkagent);
            res.send("<h1>Your account is already registered, try login</h1>");
        }

    } else {
        res.send("<h1>Password do not match, try again</h1>")
    }
}

//////////////////////////////////////////////////////Display of details required for login
exports.loginDetail = function(req, res){
    res.send("<h3>Hello agent, welcome to login page, please be ready with the following details to login to your account</h3><ul><li>Email</li><li>Password</li><li>GovtId</li></ul>");
}

//////////////////////////////////////////////////////Login agent
exports.loginAgent = async function(req, res){
    let agentData = req.body;
    let agentDetail = await agentDML.login(agentData);
    // console.log(agentDetail);
    if(agentDetail.length == 0){
        res.send("<h1>Incorrect login details</h1>");
    } else{
        agent_id = agentDetail[0].agent_id;
        // console.log(agent_id);
        res.send("<h1>Welcome, "+agentDetail[0].agent_name+ "</h1><h3>Your agent id for further use is "+agent_id+"</h3><h3><ul><li>To get your all details and to update or delete your account--    'http://localhost:3000/agent/login/:id'</li><li>To get details of all the orders in queue--    'http://localhost:3000//agent/login/:id/order'</li></ul></h3>");
    }
}

//////////////////////////////////////////////////////Display of all details of agent after successful login
exports.agentDetail = async function(req, res){
    let agentId = req.params.id;
    console.log(agentId);
    if(agent_id == agentId){
        let agentDetail = await agentDML.searchagent(agentId);
        agentDetail = JSON.stringify(agentDetail);
        res.send(agentDetail);
    } else{
        res.send("<h1>Session expired, login again</h1>");
    }
}

//////////////////////////////////////////////////////Updating details of agent
exports.updateDetail = async function(req, res){
    let agentId = req.params.id;
    let agentData = req.body;
    if(agentId == agent_id){
        agentDML.updateagent(agentData, agent_id);
        let agentDetail = await agentDML.searchagent(agentData.id);
        agentDetail = JSON.stringify(agentDetail);
        res.send("<h1>Your details are updated, New details are--</h1>"+agentDetail);   
    } else{
        res.send("<h1>Session expired, login again</h1>");
    }
}

//////////////////////////////////////////////////////Deleting agent
exports.deleteAgent = function(req, res){
    let agentId = req.params.id;
    if(agent_id == agentId){
        agentDML.deleteagent(agentId);
        res.send("<h1>Your account is deleted</h1>")
    } else{
        res.send("<h1>Session expired, login again</h1>");
    }
}

//////////////////////////////////////////////////////Displaying all orders
exports.orderDisplay = async function(req, res){
    let agentId = req.params.id;
    if(agent_id == agentId){
        let allOrders = await agentDML.getOrders();
        if(allOrders.length == 0){
            res.send("<h1>OOPS, no orders are there for delivery, lets wait for sometime</h1>")
        } else{
            allOrders = JSON.stringify(allOrders)
            res.send("<h1>"+allOrders+"</h1><h3>Use order id to pick product for more detail and to deliver</h3>")
        }
    } else{
        res.send("<h1>Session expired, login again</h1>");
    }
}

//////////////////////////////////////////////////////Fetching single order full detail using order id
exports.orderDetail = async function(req, res){
    let agentId = req.params.id;
    let orderId = req.params.orderid;
    if(agentId == agent_id){
        let orderDetail = await agentDML.orderDetail(orderId)
        if(orderDetail.length == 0){
            res.send("<h1>Order id not found, check and try again</h1>")
        } else{
            orderDetail = JSON.stringify(orderDetail);
            res.send(orderDetail+"<h1>Provide details of your delivery employee and pick this order for delivery</h1><h3>Details required are:</h3><ul><li>Delivery Employee Name (name)</li><li>Delivery Employee Contact (contact)</li><li>Delivery Expected Date (date)</li><li>Delivery status (status)</li></ul>");
        }
    } else{
        res.send("<h1>Session expired, login again</h1>");
    }
}

//////////////////////////////////////////////////////Assigning delivery agent to
exports.addTrack = async function(req, res){
    let agentId = req.params.id;
    let orderId = req.params.orderid;
    let deliveryDetail = req.body;
    if(agentId == agent_id){
        let trackDetail = await agentDML.searchTrackId(orderId);
        let trackId = trackDetail[0].order_tracking_id; 
        // console.log(trackId);
        agentDML.addToTrack(agentId, orderId, trackId, deliveryDetail);
        let checkTrack = await agentDML.checkTrack(orderId, trackId);
        let status = checkTrack[0].tracking_delivery_status;
        // console.log(checkTrack);
        if(checkTrack.length == 1){
            checkTrack = JSON.stringify(checkTrack)
            agentDML.updateOrder(orderId, status);
            res.send("<h1>Delivery of order is assigned to " + deliveryDetail.name + "</h1>"); 
        } else{
            // console.log(checkTrack);
            agentDML.removeTrack(checkTrack);
            let trackDisplay = await agentDML.trackDisplay(orderId);
            // console.log(trackDisplay);
            let employeeName = trackDisplay[0].tracking_employee_name;
            res.send("<h1>Product is already assigned to "+employeeName+"</h1>");
        }
    } else{
        res.send("<h1>Session expired, login again</h1>");
    }
}

//////////////////////////////////////////////////////Display all items in track of agent
exports.fullTrackDisplay = async function(req, res){
    let agentId = req.params.id;
    if(agentId == agent_id){
        let trackDetail = await agentDML.searchFullTrack(agentId);
        trackDetail = JSON.stringify(trackDetail);
        res.send("<h1>All orders are under your responsibility</h1><h3>"+trackDetail+"</h3><h4>To update any track use track id-- http://localhost:3000/agent/login/:id/track/:trackid");
    } else{
        res.send("<h1>Session expired, login again</h1>");
    }
}

//////////////////////////////////////////////////////Detail display of track
exports.trackDetail = async function(req, res){
    let agentId = req.params.id;
    let trackId = req.params.trackid;
    if(agentId == agent_id){
        let trackDetail = await agentDML.trackDetail(agentId, trackId)
        if(trackDetail.length == 1){
            trackDetail = JSON.stringify(trackDetail);
            res.send("<h1>All details of track: </h1><h2>"+trackDetail+"</h2><h1>You can update delivery status or delivery date using track id</h1>")
        } else{
            res.send("<h1>Wrong track id used, check and try again</h1>")
        }
    } else{
        res.send("<h1>Session expired, login again</h1>");
    }
}

//////////////////////////////////////////////////////Update details of track
exports.trackUpdate = async function(req, res){
    let agentId = req.params.id;
    let trackId = req.params.trackid;
    let updateData = req.body;
    let status = updateData.status;
    if(agentId = agent_id){
        let trackDetail = await agentDML.trackDetail(agentId, trackId)
        let orderId = trackDetail[0].tracking_order_id;
        if(trackDetail.length == 1){
            agentDML.updateTrack(agentId, trackId, updateData)
            agentDML.updateOrder(orderId, status);
            let trackDetail = await agentDML.trackDetail(agentId, trackId);
            trackDetail = JSON.stringify(trackDetail);
            res.send("<h1>Details of track updated</h1>");
        } else{
            res.send("<h1>Wrong track id used, check and try again</h1>")
        }
    } else{
        res.send("<h1>Session expired, login again</h1>");
    }
}