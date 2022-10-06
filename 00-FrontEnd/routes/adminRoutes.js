const path = require('path');
const publicPath = path.join(__dirname, "..", "public");

module.exports = function(app){
    app.get("/admin", (req, res)=>{
        res.sendFile(publicPath + "/homepage/adminHome.html")
    });
}
