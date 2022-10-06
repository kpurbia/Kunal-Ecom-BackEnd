const path = require('path');
const publicPath = path.join(__dirname, "..", "public");

module.exports = function(app){
    app.get("/customer", (req, res)=>{
        res.sendFile(publicPath + "/homepage/customerHome.html");
    });
}
