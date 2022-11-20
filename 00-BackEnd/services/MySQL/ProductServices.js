import target from './dbServer/dbserver.js';

export default class ProductServices {

    //////////////////////////////////////////////////////Getting all products for User
    getProducts = () =>{
        return new Promise((resolve) => {
            let getQuery = `SELECT * FROM products`
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
    productDetail = (id) => {
        return new Promise((resolve) => {
            let getQuery = `SELECT * FROM products WHERE product_id = ${id}`;
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