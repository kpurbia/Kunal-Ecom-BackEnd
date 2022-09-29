const vendor = require('./dbserver.js');

//////////////////////////////////////////////////////Adding vendor data to vendor table
exports.register = function(data){
    return new Promise((resolve)=>{
        // let vendorData = data;
        let registerQuery = "INSERT INTO vendor (vendor_name, vendor_govt_id, vendor_email, vendor_password, vendor_category, vendor_state, vendor_city) VALUES (?, ?, ?, ?, ?, ?, ?);"
        let registerData = vendor.format(registerQuery, [data.name, data.govtid, data.email, data.password, data.category, data.state, data.city]);
        vendor.query(registerData, (err, result)=>{
            if(err){
                throw err;
            } else{
                resolve(data);
            }
        })
    })
}

//////////////////////////////////////////////////////Checking repeat vendor registered in vendor table
exports.checkVendor = function(data){
    return new Promise((resolve)=>{
        let searchQuery = "SELECT * FROM vendor WHERE vendor_govt_id = '"+data.govtid + "'";
        // console.log(searchQuery);
        vendor.query(searchQuery, (err, result)=>{
            if(err){
                throw err;
            } else{
                resolve(result);
            }
        })
    });
}

//////////////////////////////////////////////////////Removing repeated vendor detail
exports.remove = function(data){
    // console.log("Inside remove");
    // console.log(data);
    let removeQuery = 'DELETE FROM vendor WHERE vendor_id='+data[1].vendor_id;
    // console.log(removeQuery);
    vendor.query(removeQuery, (err, result)=>{
        if(err){
            throw err;
        } else{
            console.log("Duplicate data removed");
        }
    })
}

//////////////////////////////////////////////////////Checking vendor table and log in vendor
exports.login = function(data){
    return new Promise((resolve)=>{
        let searchCmd = "SELECT * FROM vendor WHERE vendor_email = ? AND vendor_password = ? AND vendor_govt_id = ?"
        let searchQuery = vendor.format(searchCmd, [data.email, data.password, data.govtid])
        // console.log(searchQuery);
        vendor.query(searchQuery, (err, result)=>{
            if(err){
                throw err;
            } else{
                // console.log(result);
                resolve(result);
            }
        })
    })
}

//////////////////////////////////////////////////////Searching vendor data using vendor id
exports.searchVendor = function(id){
    return new Promise((resolve) => {
        let searchQuery = "SELECT * FROM vendor WHERE vendor_id = "+id;
        vendor.query(searchQuery, (err, result)=>{
            if(err){
                throw err;
            } else{
                resolve(result);
            }
        })
    })
}

//////////////////////////////////////////////////////Deleting vendor data from vendor table
exports.deleteVendor = function(id){
    let deleteQuery = "DELETE FROM vendor WHERE vendor_id = "+id;
    vendor.query(deleteQuery, (err, result)=>{
        if(err){
            throw err;
        }
    })
}

//////////////////////////////////////////////////////Updating vendor data in vendor table
exports.updateVendor = function(data, id){
    let updateQuery = "UPDATE vendor SET vendor_name = '"+data.name+"', vendor_email= '"+data.email+"', vendor_password = '"+data.password+"', vendor_govt_id = '"+data.govtid+"', vendor_category = '"+data.category+"', vendor_state = '"+data.state+"', vendor_city = '"+data.city+"' WHERE vendor_id =" +id;
    vendor.query(updateQuery, (err, result)=>{
        if(err){
            throw err;
        }
    })  
}

//////////////////////////////////////////////////////Displaying products of vendor using vendor id
exports.productDisplay = function(vendor_login_id){
    return new Promise((resolve)=>{
        let searchQuery = "SELECT * FROM product WHERE product_vendor_id = "+vendor_login_id;
        // console.log(searchQuery);
        vendor.query(searchQuery, (err, result)=>{
            if(err){
                throw err;
            } else{
                // console.log(result);
                resolve(result);
            }
        })
    });
}

//////////////////////////////////////////////////////Vendor adding products to product table
exports.addProduct = function(data, id){
    // console.log(data);
    // console.log(id);
    return new Promise((resolve) => {
        let insertCmd = "INSERT INTO product (product_vendor_id, product_name, product_category, product_price, product_quantity) VALUES (?, ?, ?, ?, ?)"
        let insertQuery = vendor.format(insertCmd, [id, data.name, data.category, data.price, data.quantity]);
        vendor.query(insertQuery, (err, result)=>{
            if(err){
                throw err;
            } else{
                // console.log(data);
                resolve(data);
            }
        })       
    })
}

//////////////////////////////////////////////////////Vendor searching single product using product name and vendor id
exports.searchProduct = function(data, id){
    return new Promise((resolve)=>{
        let searchQuery = "SELECT * FROM product WHERE product_name ='"+data.name+"' AND product_vendor_id ="+id;
        vendor.query(searchQuery, (err, result)=>{
            if(err){
                throw err;
            } else{
                resolve(result);
            }
        })
    })
}

//////////////////////////////////////////////////////Deleting repeated product by same vendor
exports.removeDuplicateProduct = function(data){
    // console.log("Inside duplicate");
    // console.log(data);
    let deleteQuery = "DELETE FROM product WHERE product_id!="+data[1].id;
    vendor.query(deleteQuery, (err, result)=>{
        if(err){
            throw err;
        } else{
            console.log(result);
        }
    });
}

//////////////////////////////////////////////////////Vendor updating selected product
exports.updateProduct = function(data, vendor_id){
    // console.log(data);
    // console.log(vendor_id);
    let updateQuery = "UPDATE product SET product_name = '"+data.name+"', product_category = '"+data.category+"', product_price = '"+data.price+"', product_quantity= '"+data.quantity+"' WHERE product_vendor_id =" +vendor_id+ " AND product_id ="+data.id;
    vendor.query(updateQuery, (err, result)=>{
        if(err){
            throw err;
        }
    });
}

//////////////////////////////////////////////////////Vendor deleting product
exports.deleteProduct = function(deleteProduct){
    let deleteQuery = "DELETE FROM product WHERE product_id = "+deleteProduct.id;
    // console.log(deleteQuery);
    vendor.query(deleteQuery, (err, result)=>{
        if(err){
            throw err;
        }
    })
}