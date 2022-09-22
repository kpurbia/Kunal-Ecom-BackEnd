

module.exports = function(app){
    app.route("/agent").get((req, res)=>{
        res.send('<h1>Welcome Agent</h1><h3>You can join our ecommerce as our delivery partner:</h3><ul><li>If you do not have your account with us, please register- ("/agent/register")</li><li>If you already have your account with us, you can login- ("/agent/login")</li></ul><h4>EXPLORE & ENJOY</h4>')
    });
}