const vendordb = require('./dbserver.js');

exports.register = function(data){
    return new Promise((resolve)=>{
        // let vendorData = data;
        let registerQuery = "INSERT INTO vendor (vendor_name, vendor_govtid, vendor_email, vendor_password, vendor_category, vendor_state, vendor_city) VALUES (?, ?, ?, ?, ?, ?, ?);"
        let registerData = vendordb.format(registerQuery, [data.name, data.govtid, data.email, data.password, data.category, data.state, data.city]);
        vendordb.query(registerData, (err, result)=>{
            if(err){
                throw err;
            } else{
                resolve(data);
            }
        })
    })
}

exports.remove = function(data){
    let removeQuery = 'DELETE FROM vendor WHERE vendor_govtid="'+data+'"';
    vendordb.query(removeQuery, (err, result)=>{
        if(err){
            throw err;
        } else{
            console.log("Duplicate data removed");
        }
    })
}

exports.login = function(data){
    return new Promise((resolve)=>{
        let searchCmd = "SELECT * FROM vendor WHERE vendor_email = ? AND vendor_password = ? AND vendor_govtid = ?"
        let searchQuery = vendordb.format(searchCmd, [data.email, data.password, data.govtid])
        // console.log(searchQuery);
        vendordb.query(searchQuery, (err, result)=>{
            if(err){
                throw err;
            } else{
                // console.log(result);
                resolve(result);
            }
        })
    })
}