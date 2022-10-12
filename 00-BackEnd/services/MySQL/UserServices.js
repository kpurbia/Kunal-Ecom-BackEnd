import target from './dbServer/dbserver.js';

export default class UserServices {

    //////////////////////////////////////////////////////Adding user data and role to users table
    register=(data, role)=> {
        let insertCmd = "INSERT INTO users (user_name, user_email, user_password, user_contact, user_state, user_city, user_role) VALUES (?, ?, ?, ?, ?, ?, ?)"
        let insertQuery = target.format(insertCmd, [data.name, data.email, data.password, data.contact, data.state, data.city, role]);
        target.query(insertQuery, (err, result) => {
            if (err) {
                throw err;
            }
        })
    }

    //////////////////////////////////////////////////////Checking duplicate data
    checkUser=(data)=> {
        return new Promise((resolve) => {
            let searchQuery = "SELECT * FROM users WHERE user_email = '" + data.email + "'";
            target.query(searchQuery, (err, result) => {
                if (err) {
                    throw err;
                } else {
                    resolve(result);
                }
            })
        })
    }

    //////////////////////////////////////////////////////Removing repeated user detail
    remove=(data)=> {
        let removeQuery = 'DELETE FROM users WHERE user_id =' + data[1].user_id;
        target.query(removeQuery, (err, result) => {
            if (err) {
                throw err;
            }
        })
    }

    //////////////////////////////////////////////////////Removing repeated govt id
    removegovtid=(data)=> {
        let removeQuery = 'DELETE FROM users WHERE user_id =' + data[0].user_id;
        target.query(removeQuery, (err, result) => {
            if (err) {
                throw err;
            }
        })
    }

    //////////////////////////////////////////////////////Login of user
    login=(data) =>{
        return new Promise((resolve) => {
            let searchQuery = "SELECT * FROM users WHERE user_email = '" + data.email + "' AND user_password = '" + data.password + "'";
            target.query(searchQuery, (err, result) => {
                if (err) {
                    throw err;
                } else {
                    resolve(result);
                }
            })
        })
    }

    //////////////////////////////////////////////////////Updating account in users table 
    updateUser=(userId, data)=> {
        let updateQuery = `UPDATE users SET user_name = '${data.name}', user_email = '${data.email}', user_password = '${data.password}', user_contact = '${data.contact}', user_state = '${data.state}', user_city = '${data.city}' WHERE user_id = ${userId}`
        target.query(updateQuery, (err, result) => {
            if (err) throw err;
        })
    }

    //////////////////////////////////////////////////////Deleting user account
    deleteUser=(userId) =>{
        let deleteQuery = `DELETE FROM users WHERE user_id = ${userId};`
        target.query(deleteQuery, (err, result) => {
            if (err) throw err;
        })
    }

    //////////////////////////////////////////////////////Getting all products for User
    getProducts=()=> {
        return new Promise((resolve) => {
            let getQuery = "SELECT * FROM products"
            target.query(getQuery, (err, result) => {
                if (err) {
                    throw err;
                } else {
                    resolve(result)
                }
            })
        })
    }

    //////////////////////////////////////////////////////Getting product in detail using product id
    productDetail=(id)=>{
        return new Promise((resolve) => {
            let getQuery = "SELECT * FROM products WHERE product_id = "+id;
            target.query(getQuery, (err, result)=>{
                if(err){
                    throw err;
                } else{
                    resolve(result);
                }
            })
        })
    }
}