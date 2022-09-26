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

exports.checkVendor = function(data){
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

exports.searchVendor = function(id){
    return new Promise((resolve) => {
        let searchQuery = "SELECT * FROM vendor WHERE vendor_id = "+id;
        vendordb.query(searchQuery, (err, result)=>{
            if(err){
                throw err;
            } else{
                resolve(result);
            }
        })
    })
}

exports.deleteVendor = function(id){
    let deleteQuery = "DELETE FROM vendor WHERE vendor_id = "+id;
    vendordb.query(deleteQuery, (err, result)=>{
        if(err){
            throw err;
        }
    })
}

exports.updateVendor = function(data, id){
    let updateQuery = "UPDATE vendor SET vendor_name = '"+data.name+"', vendor_email= '"+data.email+"', vendor_password = '"+data.password+"', vendor_govt_id = '"+data.govtid+"', vendor_category = '"+data.category+"', vendor_state = '"+data.state+"', vendor_city = '"+data.city+"' WHERE vendor_id =" +id;
    vendordb.query(updateQuery, (err, result)=>{
        if(err){
            throw err;
        }
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
        let insertQuery = vendordb.format(insertCmd, [id, data.name, data.category, data.price, data.quantity]);
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
        let searchQuery = "SELECT * FROM product WHERE product_name ='"+data.name+"' AND product_vendor_id ="+id;
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
    let deleteQuery = "DELETE FROM product WHERE product_id!="+data[0].id;
    vendordb.query(deleteQuery, (err, result)=>{
        if(err){
            throw err;
        } else{
            console.log(result);
        }
    });
}

exports.updateProduct = function(data, vendor_id){
    // console.log(data);
    // console.log(vendor_id);
    let updateQuery = "UPDATE product SET product_name = '"+data.name+"', product_category = '"+data.category+"', product_price = '"+data.price+"', product_quantity= '"+data.quantity+"' WHERE product_vendor_id =" +vendor_id+ " AND product_id ="+data.id;
    vendordb.query(updateQuery, (err, result)=>{
        if(err){
            throw err;
        }
    });
}

exports.deleteProduct = function(deleteProduct){
    let deleteQuery = "DELETE FROM product WHERE product_id = "+deleteProduct.id;
    // console.log(deleteQuery);
    vendordb.query(deleteQuery, (err, result)=>{
        if(err){
            throw err;
        }
    })
}