

module.exports = function(app){
    app.route("/user").get((req, res)=>{
        res.send('<h1>Welcome user</h1><h3>You can access our ecommerce using 3 ways:</h3><ul><li>If you want to explore our page, you can enter as a guest- ("/user/guest")</li><li>If you want to have an account with us, you can register- ("/user/register")</li><li>If you already have your account with us, you can login- ("/user/login")</li></ul><h4>EXPLORE & ENJOY</h4>')
    });
}