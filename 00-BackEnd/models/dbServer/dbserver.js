import mysql from 'mysql';

const target = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password1234",
    database: "ecommerce"
});

target.connect((err)=>{
    if(err){
        throw err;
    } else {
        console.log("DATABASE CONNECTED");
    }
});

export default target;
