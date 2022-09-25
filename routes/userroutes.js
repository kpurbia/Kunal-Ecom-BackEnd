

module.exports = function(app){
    app.route("/user").get((req, res)=>{
        res.send("<h1>Welcome user</h1><h3>You can access our ecommerce using three ways:</h3><ul><li>If you want to explore our page, you can enter as a guest- ('http://localhost:3000/user/guest')</li><li>If you want to create an account with us, you can register- ('http://localhost:3000/user/register')</li><li>If you already have your account with us, you can login- ('http://localhost:3000/user/login')</li></ul><h4>EXPLORE & ENJOY & DON'T FORGET TO BUY YOUR CHOICES BECAUSE WE KNOW YOUR CHOICE IS THE BEST</h4>")
    });
}