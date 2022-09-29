const agent = require('./dbServer/dbserver.js');

//////////////////////////////////////////////////////Adding agent data to agent table
exports.register = function(data){
    return new Promise((resolve)=>{
        // let agentData = data;
        let registerQuery = "INSERT INTO agent (agent_name, agent_email, agent_password, agent_govt_id, agent_contact, agent_state, agent_city) VALUES (?, ?, ?, ?, ?, ?, ?);"
        let registerData = agent.format(registerQuery, [data.name, data.email, data.password, data.govtid, data.contact, data.state, data.city]);
        agent.query(registerData, (err, result)=>{
            if(err){
                throw err;
            } else{
                resolve(data);
            }
        })
    })
}

//////////////////////////////////////////////////////Checking repeat agent registered in agent table
exports.checkagent = function(data){
    return new Promise((resolve)=>{
        let searchQuery = "SELECT * FROM agent WHERE agent_govt_id = '"+data.govtid + "'";
        // console.log(searchQuery);
        agent.query(searchQuery, (err, result)=>{
            if(err){
                throw err;
            } else{
                resolve(result);
            }
        })
    });
}

//////////////////////////////////////////////////////Removing repeated agent detail
exports.remove = function(data){
    // console.log("Inside remove");
    // console.log(data);
    let removeQuery = 'DELETE FROM agent WHERE agent_id='+data[1].agent_id;
    // console.log(removeQuery);
    agent.query(removeQuery, (err, result)=>{
        if(err){
            throw err;
        } else{
            console.log("Duplicate data removed");
        }
    })
}

//////////////////////////////////////////////////////Checking agent table and log in agent
exports.login = function(data){
    return new Promise((resolve)=>{
        let searchCmd = "SELECT * FROM agent WHERE agent_email = ? AND agent_password = ? AND agent_govt_id = ?"
        let searchQuery = agent.format(searchCmd, [data.email, data.password, data.govtid])
        // console.log(searchQuery);
        agent.query(searchQuery, (err, result)=>{
            if(err){
                throw err;
            } else{
                // console.log(result);
                resolve(result);
            }
        })
    })
}

//////////////////////////////////////////////////////Searching agent data using agent id
exports.searchagent = function(id){
    return new Promise((resolve) => {
        let searchQuery = "SELECT * FROM agent WHERE agent_id = "+id;
        agent.query(searchQuery, (err, result)=>{
            if(err){
                throw err;
            } else{
                resolve(result);
            }
        })
    })
}

//////////////////////////////////////////////////////Deleting agent data from agent table
exports.deleteagent = function(id){
    let deleteQuery = "DELETE FROM agent WHERE agent_id = "+id;
    agent.query(deleteQuery, (err, result)=>{
        if(err){
            throw err;
        }
    })
}

//////////////////////////////////////////////////////Updating agent data in agent table
exports.updateagent = function(data, id){
    let updateQuery = "UPDATE agent SET agent_name = '"+data.name+"', agent_email= '"+data.email+"', agent_password = '"+data.password+"', agent_govt_id = '"+data.govtid+"', agent_contact = '"+data.contact+"', agent_state = '"+data.state+"', agent_city = '"+data.city+"' WHERE agent_id =" +id;
    agent.query(updateQuery, (err, result)=>{
        if(err){
            throw err;
        }
    })  
}

//////////////////////////////////////////////////////Displaying all orders which are not picked by any agent
exports.getOrders = async function(){
    return new Promise((resolve) => {
        let displayQuery = "SELECT order_id, order_tracking_id, order_delivery_state, order_delivery_city, order_place_date FROM `order` WHERE order_status IS NULL ORDER BY order_delivery_state, order_delivery_city ASC;"
        agent.query(displayQuery, (err, result)=>{
            if(err){
                throw err;
            } else{
                resolve(result);
            }
        })
    })
}

//////////////////////////////////////////////////////Display of single order using order id
exports.orderDetail = function(orderId){
    return new Promise((resolve) => {
        let searchQuery = "SELECT order_id, order_tracking_id, order_delivery_name, order_delivery_contact, order_place_date, order_delivery_address, order_delivery_city, order_delivery_state FROM `order` WHERE order_status IS NULL AND order_id = "+orderId;
        agent.query(searchQuery, (err, result)=>{
            if(err){
                throw err;
            } else{
                console.log(result);
                resolve(result);
            }
        })
    })
}

//////////////////////////////////////////////////////Fetching tracking id using order id
exports.searchTrackId = function(orderId){
    return new Promise((resolve)=>{
        let searchQuery = "SELECT order_tracking_id FROM `order` WHERE order_id = "+orderId;
        agent.query(searchQuery, (err, result)=>{
            if(err){
                throw err;
            } else{
                resolve(result);
            }
        })
    });
}

//////////////////////////////////////////////////////Adding order to track
exports.addToTrack = function(agentId, orderId, trackId, data){
    let insertCmd = "INSERT INTO tracking (tracking_track_id, tracking_order_id, tracking_agent_id, tracking_employee_name, tracking_employee_contact, tracking_expect_date, tracking_delivery_status) VALUES (?, ?, ?, ?, ?, ?, ?)" 
    let insertQuery = agent.format(insertCmd, [trackId, orderId, agentId, data.name, data.contact, data.date, data.status]);
    agent.query(insertQuery, (err, result)=>{
        if(err){
            throw err;
        }
    })
}

//////////////////////////////////////////////////////Updating delivery status in order table
exports.updateOrder = function(orderId, status){
    let updateQuery = "UPDATE `order` SET order_status = '"+status+"' WHERE order_id = "+orderId;
    agent.query(updateQuery, (err, result)=>{
        if(err){
            throw err
        }
    })
}

//////////////////////////////////////////////////////Searching track for duplicate data
exports.checkTrack = function(orderId, trackId){
    return new Promise((resolve) => {
        let searchQuery = "SELECT * FROM tracking WHERE tracking_order_id = "+orderId+" AND tracking_track_id = "+trackId; 
        agent.query(searchQuery, (err, result)=>{
            if(err){
                throw err;
            } else{
                resolve(result);
            }
        })
    })
}

//////////////////////////////////////////////////////Removing duplicate item from track
exports.removeTrack = function(trackData){
    let removeQuery = "DELETE FROM tracking WHERE tracking_id != "+trackData[0].tracking_id;
    agent.query(removeQuery, (err, result)=>{
        if(err){
            throw err;
        }
    })
}

//////////////////////////////////////////////////////Displaying selected item in track
exports.trackDisplay = function(orderId){
    return new Promise((resolve) => {
        let searchQuery = "SELECT * FROM tracking WHERE tracking_order_id = "+orderId;
        agent.query(searchQuery, (err, result)=>{
        if(err){
            throw err 
        } else{
            resolve(result)
        }
    })
    })
}

//////////////////////////////////////////////////////Displaying all track items with agent id
exports.searchFullTrack = function(agentId){
    return new Promise((resolve) => {
        let searchQuery = "SELECT tracking_id, tracking_employee_name, tracking_expect_date, tracking_delivery_status FROM tracking WHERE tracking_agent_id = "+agentId;
        agent.query(searchQuery, (err, result)=>{
            if(err){
                throw err;
            } else{
                resolve(result);
            }
        })
    })
}

//////////////////////////////////////////////////////Display of single track item
exports.trackDetail = function(agentId, trackId){
    return new Promise((resolve)=>{
        let searchQuery = "SELECT * FROM tracking WHERE tracking_agent_id = "+agentId+" AND tracking_id = "+trackId;
        agent.query(searchQuery, (err, result)=>{
            if(err){
                throw err;
            } else{
                resolve(result);
            }
        })
    })
}

//////////////////////////////////////////////////////Updating data in track
exports.updateTrack = function(agentId, trackId, data){
    let updateQuery = "UPDATE tracking SET tracking_employee_name = '"+data.name+"', tracking_employee_contact = '"+data.contact+"', tracking_expect_date = '"+data.date+"', tracking_delivery_status = '"+data.status+"', tracking_delivery_date = '"+data.deliveryDate+"' WHERE tracking_id = "+trackId+" AND tracking_agent_id =" +agentId;
    agent.query(updateQuery, (err, result)=>{
        if(err){
            throw err;
        }
    })
}



















