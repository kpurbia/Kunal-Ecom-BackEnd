import target from './dbServer/dbserver.js';

export default class UserDML {
    
    //////////////////////////////////////////////////////Adding user data and role to users table
    register(data, role) {
        let insertCmd = "INSERT INTO users (user_name, user_email, user_password, user_contact, user_state, user_city, user_role) VALUES (?, ?, ?, ?, ?, ?, ?)"
        let insertQuery = target.format(insertCmd, [data.name, data.email, data.password, data.contact, data.state, data.city, role]);
        target.query(insertQuery, (err, result) => {
            if (err) {
                throw err;
            }
        })
    }

    //////////////////////////////////////////////////////Checking duplicate data
    checkUser(data) {
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
    remove(data) {
        let removeQuery = 'DELETE FROM users WHERE user_id =' + data[1].user_id;
        target.query(removeQuery, (err, result) => {
            if (err) {
                throw err;
            }
        })
    }

    //////////////////////////////////////////////////////Removing repeated govt id
    removegovtid(data) {
        let removeQuery = 'DELETE FROM users WHERE user_id =' + data[0].user_id;
        target.query(removeQuery, (err, result) => {
            if (err) {
                throw err;
            }
        })
    }

    //////////////////////////////////////////////////////Login of user
    login(data) {
        return new Promise((resolve) => {
            let searchQuery = "SELECT * FROM users WHERE user_email = '" + data.email + "' AND user_password = '"+data.password+"'";
            target.query(searchQuery, (err, result) => {
                if (err) {
                    throw err;
                } else {
                    resolve(result);
                }
            })
        })
    }
}