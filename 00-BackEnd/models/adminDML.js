const admin = require('./dbServer/dbserver.js');

//////////////////////////////////////////////////////Adding admin data to admin table
exports.register = function(data, id){
    return new Promise((resolve)=>{
        // let adminData = data;
        let registerQuery = "INSERT INTO admins (admin_company_id, admin_user_id) VALUES (?, ?);"
        let registerData = admin.format(registerQuery, [data.companyid, id]);
        admin.query(registerData, (err, result)=>{
            if(err){
                throw err;
            } else{
                resolve(data);
            }
        })
    })
}

//////////////////////////////////////////////////////Checking repeat admin registered in admin table
exports.checkAdmin = function(data){
    return new Promise((resolve)=>{
        let searchQuery = "SELECT * FROM admins WHERE admin_company_id = '"+data.companyid + "'";
        // console.log(searchQuery);
        admin.query(searchQuery, (err, result)=>{
            if(err){
                throw err;
            } else{
                resolve(result);
            }
        })
    });
}

//////////////////////////////////////////////////////Removing repeated admin detail
exports.remove = function(data){
    let removeQuery = 'DELETE FROM admins WHERE admin_id ='+data[1].admin_id;
    admin.query(removeQuery, (err, result)=>{
        if(err){
            throw err;
        }
    })
}