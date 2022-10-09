const registerationRoutes = require('./routes/registerationRoutes.js');
const customerRoutes = require('./routes/customerRoutes.js');
const vendorRoutes = require('./routes/vendorRoutes.js');
const agentRoutes = require('./routes/agentRoutes.js');
const adminRoutes = require('./routes/adminRoutes.js');
const userRoutes = require('./routes/userRoutes')
const express = require('express');
const app = express();
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));

app.get("/", (req, res)=>{
    res.sendFile("index.html");
});
app.get("/login", (req, res)=>{
    res.sendFile(__dirname + '/public/login.html');
});

registerationRoutes(app);
customerRoutes(app);
vendorRoutes(app);
agentRoutes(app);
adminRoutes(app);
userRoutes(app);

app.listen(9000, ()=>{
    console.log("Server listening on 9000");
});