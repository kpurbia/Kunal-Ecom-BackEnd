import target from './dbServer/dbserver.js';

export default class VendorDML {

    //////////////////////////////////////////////////////Adding vendor data to vendor table
    register = (data, id) => {
        let registerQuery = "INSERT INTO vendors (vendor_user_id, vendor_govt_id, vendor_category) VALUES (?, ?, ?);"
        let registerData = target.format(registerQuery, [id, data.govtid, data.category]);
        target.query(registerData, (err, result) => {
            if (err) throw err;
        })
    }

    //////////////////////////////////////////////////////Checking repeat vendor registered in vendor table
    checkVendor = (data) => {
        return new Promise((resolve) => {
            let searchQuery = "SELECT * FROM vendors WHERE vendor_govt_id = '" + data.govtid + "'";
            target.query(searchQuery, (err, result) => {
                if (err) {
                    throw err;
                } else {
                    resolve(result);
                }
            })
        });
    }

    //////////////////////////////////////////////////////Removing repeated vendor detail
    remove = (data) => {
        let removeQuery = 'DELETE FROM vendors WHERE vendor_id=' + data[1].vendor_id;
        target.query(removeQuery, (err, result) => {
            if (err) throw err;
        })
    }

    //////////////////////////////////////////////////////Fetching all vendor data using its user id from users table
    getVendorData = (id) => {
        return new Promise((resolve) => {
            let getQuery = "SELECT * FROM users WHERE user_id = " + id;
            target.query(getQuery, (err, data) => {
                if (err) {
                    throw err;
                } else {
                    resolve(data)
                }
            })
        })
    }

    //////////////////////////////////////////////////////Fetching govt id of following vendor_user_id from vendors table
    getVendorDetail = (id) =>{
        return new Promise((resolve) => {
            let searchQuery = "SELECT * FROM vendors WHERE vendor_user_id = "+id;
            target.query(searchQuery, (err, result)=>{
                if(err){
                    throw err;
                } else{
                    resolve(result);
                }
            })
        })

    }

    //////////////////////////////////////////////////////Updating vendor account in vendors table
    updateVendor = (vendorId, data) => {
        let updateQuery = `UPDATE vendors SET vendor_govt_id = '${data.govtid}', vendor_category = '${data.category}' WHERE vendor_id = ${vendorId}`
        target.query(updateQuery, (err, result)=>{
            if(err) throw err;
        })
    }

    //////////////////////////////////////////////////////Deleting vendor account
    deleteVendor = (vendorId) => {
        let deleteQuery = `DELETE FROM vendors WHERE vendor_user_id = ${vendorId};`
        target.query(deleteQuery,(err, result)=>{
            if(err) throw err;
        })
    }

    //////////////////////////////////////////////////////Adding product to product table
    addProduct = (data, vendorId) => {
        let insertCmd = "INSERT INTO products (product_vendor_id, product_name, product_category, product_price, product_description, product_quantity) VALUES (?, ?, ?, ?, ?, ?);"
        let insertQuery = target.format(insertCmd, [vendorId, data.pName, data.pCategory, data.pPrice, data.pDescription, data.pQuantity]);
        target.query(insertQuery, (err, result) => {
            if (err) throw err;
        })
    }
}






// //////////////////////////////////////////////////////Checking vendor table and log in vendor
// exports.login = function (data) {
//     return new Promise((resolve) => {
//         let searchCmd = "SELECT * FROM vendor WHERE vendor_email = ? AND vendor_password = ?"
//         let searchQuery = target.format(searchCmd, [data.email, data.password])
//         // console.log(searchQuery);
//         target.query(searchQuery, (err, result) => {
//             if (err) {
//                 throw err;
//             } else {
//                 // console.log(result);
//                 resolve(result);
//             }
//         })
//     })
// }

// //////////////////////////////////////////////////////Searching vendor data using vendor id
// exports.searchVendor = function (id) {
//     return new Promise((resolve) => {
//         let searchQuery = "SELECT * FROM vendor WHERE vendor_id = " + id;
//         target.query(searchQuery, (err, result) => {
//             if (err) {
//                 throw err;
//             } else {
//                 resolve(result);
//             }
//         })
//     })
// }

// //////////////////////////////////////////////////////Deleting vendor data from vendor table
// exports.deleteVendor = function (id) {
//     let deleteQuery = "DELETE FROM vendor WHERE vendor_id = " + id;
//     target.query(deleteQuery, (err, result) => {
//         if (err) {
//             throw err;
//         }
//     })
// }

// //////////////////////////////////////////////////////Updating vendor data in vendor table
// exports.updateVendor = function (data, id) {
//     let updateQuery = "UPDATE vendor SET vendor_name = '" + data.name + "', vendor_email= '" + data.email + "', vendor_password = '" + data.password + "', vendor_govt_id = '" + data.govtid + "', vendor_category = '" + data.category + "', vendor_state = '" + data.state + "', vendor_city = '" + data.city + "' WHERE vendor_id =" + id;
//     target.query(updateQuery, (err, result) => {
//         if (err) {
//             throw err;
//         }
//     })
// }

// //////////////////////////////////////////////////////Displaying products of vendor using vendor id
// exports.productDisplay = function (vendor_login_id) {
//     return new Promise((resolve) => {
//         let searchQuery = "SELECT * FROM product WHERE product_vendor_id = " + vendor_login_id;
//         // console.log(searchQuery);
//         target.query(searchQuery, (err, result) => {
//             if (err) {
//                 throw err;
//             } else {
//                 // console.log(result);
//                 resolve(result);
//             }
//         })
//     });
// }

// //////////////////////////////////////////////////////Vendor adding products to product table
// exports.addProduct = function (data, id) {
//     // console.log(data);
//     // console.log(id);
//     return new Promise((resolve) => {
//         let insertCmd = "INSERT INTO product (product_vendor_id, product_name, product_category, product_price, product_quantity) VALUES (?, ?, ?, ?, ?)"
//         let insertQuery = target.format(insertCmd, [id, data.name, data.category, data.price, data.quantity]);
//         target.query(insertQuery, (err, result) => {
//             if (err) {
//                 throw err;
//             } else {
//                 // console.log(data);
//                 resolve(data);
//             }
//         })
//     })
// }

// //////////////////////////////////////////////////////Vendor searching single product using product name and vendor id
// exports.searchProduct = function (data, id) {
//     return new Promise((resolve) => {
//         let searchQuery = "SELECT * FROM product WHERE product_name ='" + data.name + "' AND product_vendor_id =" + id;
//         target.query(searchQuery, (err, result) => {
//             if (err) {
//                 throw err;
//             } else {
//                 resolve(result);
//             }
//         })
//     })
// }

// //////////////////////////////////////////////////////Deleting repeated product by same vendor
// exports.removeDuplicateProduct = function (data) {
//     // console.log("Inside duplicate");
//     // console.log(data);
//     let deleteQuery = "DELETE FROM product WHERE product_id!=" + data[1].id;
//     target.query(deleteQuery, (err, result) => {
//         if (err) {
//             throw err;
//         } else {
//             console.log(result);
//         }
//     });
// }

// //////////////////////////////////////////////////////Vendor updating selected product
// exports.updateProduct = function (data, vendor_id) {
//     // console.log(data);
//     // console.log(vendor_id);
//     let updateQuery = "UPDATE product SET product_name = '" + data.name + "', product_category = '" + data.category + "', product_price = '" + data.price + "', product_quantity= '" + data.quantity + "' WHERE product_vendor_id =" + vendor_id + " AND product_id =" + data.id;
//     target.query(updateQuery, (err, result) => {
//         if (err) {
//             throw err;
//         }
//     });
// }

// //////////////////////////////////////////////////////Vendor deleting product
// exports.deleteProduct = function (deleteProduct) {
//     let deleteQuery = "DELETE FROM product WHERE product_id = " + deleteProduct.id;
//     // console.log(deleteQuery);
//     target.query(deleteQuery, (err, result) => {
//         if (err) {
//             throw err;
//         }
//     })
// }