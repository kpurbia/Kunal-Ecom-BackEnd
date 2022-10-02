const user = require('./dbServer/dbserver.js');

//////////////////////////////////////////////////////Adding user data and role to users table
exports.register = function(data, role){
    let insertCmd = "INSERT INTO users (user_name, user_email, user_password, user_contact, user_state, user_city, user_role) VALUES (?, ?, ?, ?, ?, ?, ?)"
    let insertQuery = user.format(insertCmd, [data.name, data.email, data.password, data.contact, data.state, data.city, role]);
    user.query(insertQuery, (err, result)=>{
        if(err){
            throw err;
        }
    })
}


//////////////////////////////////////////////////////Checking duplicate data
exports.checkUser = function(data, role){
    return new Promise((resolve) => {
        let searchQuery = "SELECT * FROM users WHERE user_email = '"+data.email+"'";
        user.query(searchQuery, (err, result)=>{
            if(err){
                throw err;
            } else{
                resolve(result);
            }
        })
    })
}

//////////////////////////////////////////////////////Removing repeated user detail
exports.remove = function(data){
    let removeQuery = 'DELETE FROM users WHERE user_id ='+data[1].user_id;
    user.query(removeQuery, (err, result)=>{
        if(err){
            throw err;
        }
    })
}

//////////////////////////////////////////////////////Removing repeated govt id
exports.removegovtid = function(data){
    let removeQuery = 'DELETE FROM users WHERE user_id ='+data[0].user_id;
    user.query(removeQuery, (err, result)=>{
        if(err){
            throw err;
        }
    })
}