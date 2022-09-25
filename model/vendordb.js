const vendordb = require('./dbserver.js');

exports.register = function(data){
    return new Promise((resolve)=>{
        // let vendorData = data;
        let registerQuery = "INSERT INTO vendor (vendor_name, vendor_govt_id, vendor_email, vendor_password, vendor_category, vendor_state, vendor_city) VALUES (?, ?, ?, ?, ?, ?, ?);"
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

exports.searchVendor = function(data){
    return new Promise((resolve)=>{
        let searchQuery = "SELECT * FROM vendor WHERE vendor_govt_id = '"+data.govtid + "'";
        // console.log(searchQuery);
        vendordb.query(searchQuery, (err, result)=>{
            if(err){
                throw err;
            } else{
                resolve(result);
            }
        })
    });
}

exports.remove = function(data){
    // console.log("Inside remove");
    // console.log(data);
    let removeQuery = 'DELETE FROM vendor WHERE vendor_id='+data[1].vendor_id;
    // console.log(removeQuery);
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
        let searchCmd = "SELECT * FROM vendor WHERE vendor_email = ? AND vendor_password = ? AND vendor_govt_id = ?"
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

exports.productDisplay = function(vendor_login_id){
    return new Promise((resolve)=>{
        let searchQuery = "SELECT * FROM product WHERE product_vendor_id = "+vendor_login_id;
        // console.log(searchQuery);
        vendordb.query(searchQuery, (err, result)=>{
            if(err){
                throw err;
            } else{
                // console.log(result);
                resolve(result);
            }
        })
    });
}

exports.addProduct = function(data, id){
    // console.log(data);
    // console.log(id);
    return new Promise((resolve) => {
        let insertCmd = "INSERT INTO product (product_vendor_id, product_name, product_category, product_price, product_quantity) VALUES (?, ?, ?, ?, ?)"
        let insertQuery = vendordb.format(insertCmd, [id, data.product_name, data.product_category, data.product_price, data.product_quantity]);
        vendordb.query(insertQuery, (err, result)=>{
            if(err){
                throw err;
            } else{
                // console.log(data);
                resolve(data);
            }
        })       
    })
}

exports.searchProduct = function(data, id){
    return new Promise((resolve)=>{
        let searchQuery = "SELECT * FROM product WHERE product_name ='"+data.product_name+"' AND product_vendor_id ="+id;
        vendordb.query(searchQuery, (err, result)=>{
            if(err){
                throw err;
            } else{
                resolve(result);
            }
        })
    })
}

exports.removeDuplicateProduct = function(data){
    // console.log("Inside duplicate");
    // console.log(data);
    let deleteQuery = "DELETE FROM product WHERE product_id!="+data[0].product_id;
    vendordb.query(deleteQuery, (err, result)=>{
        if(err){
            throw err;
        } else{
            console.log(result);
        }
    })
}

exports.updateProduct = function(data, vendor_id){
    // console.log(data);
    // console.log(vendor_id);
    return new Promise((resolve) => {
        let updateQuery = "UPDATE product SET product_price = "+data.product_price+", product_quantity= "+data.product_quantity+" WHERE product_vendor_id =" +vendor_id;
        vendordb.query(updateQuery, (err, result)=>{
            if(err){
                throw err;
            }
        })  
    })
}

exports.deleteProduct = function(deleteProduct){
    let deleteQuery = "DELETE FROM product WHERE product_id = "+deleteProduct.product_id;
    console.log(deleteQuery);
    vendordb.query(deleteQuery, (err, result)=>{
        if(err){
            throw err;
        }
    })
}