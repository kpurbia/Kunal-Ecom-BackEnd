import target from './dbServer/dbserver.js';

export default class AdminServices {

    //////////////////////////////////////////////////////Adding admin data to admin table
    register = (data, id) => {
        return new Promise((resolve) => {
            // let adminData = data;
            let registerQuery = "INSERT INTO admins (admin_company_id, admin_user_id) VALUES (?, ?);"
            let registerData = target.format(registerQuery, [data.companyid, id]);
            target.query(registerData, (err, result) => {
                if (err) {
                    throw err;
                } else {
                    resolve(data);
                }
            })
        })
    }

    //////////////////////////////////////////////////////Checking repeat admin registered in admin table
    checkAdmin = (data) => {
        return new Promise((resolve) => {
            let searchQuery = "SELECT * FROM admins WHERE admin_company_id = '" + data.companyid + "'";
            target.query(searchQuery, (err, result) => {
                if (err) {
                    throw err;
                } else {
                    resolve(result);
                }
            })
        });
    }

    //////////////////////////////////////////////////////Removing repeated admin detail
    remove = (data) => {
        let removeQuery = 'DELETE FROM admins WHERE admin_id =' + data[1].admin_id;
        target.query(removeQuery, (err, result) => {
            if (err) {
                throw err;
            }
        })
    }
}