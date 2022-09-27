

module.exports = function(app){
    app.route("/agent").get((req, res)=>{
        res.send('<h1>Welcome Agent</h1><h3>You can join our ecommerce as our delivery partner:</h3><ul><li>If you do not have your account with us, please register- ("http://localhost:3000/agent/register")</li><li>If you already have your account with us, you can login- ("http://localhost:3000/agent/login")</li></ul><h4>REMEMBER PARTNERS NEVER CHEAT AND THEY ALWAYS WORK HARD TOGETHER </h4>')
    });

    app.route("/agent/register").get((req, res)=>{
        
    })

}