const vendorRoutes = require('./routes/vendorroutes');
const userRoutes = require('./routes/userroutes');
const agentRoutes = require('./routes/agentroutes');
const express = require('express');
const app = express();
const port = 3000;

//Setting Middlewares
app.use(express.urlencoded({extended: true}));
app.use(express.json());

//Displaying homepage
app.get("/", (req, res)=>{
    res.send("<h3>Hello, welcome to home page of our ecommerce, follow the instructions given below</h3><h5>Check your category of access and use the respective way</h5><p>If you are a vendor, access our page using:</p><ul><li>http://localhost:3000/vendor</li></ul><p>If you are a user, access our page using:</p><ul><li>http://localhost:3000/user</li></ul><p>If you are an agent, access our page using:</p><ul><li>http://localhost:3000/agent</li></ul>");
})

//Initializing router
vendorRoutes(app);
userRoutes(app);
agentRoutes(app);

//Starting server
app.listen(port, ()=>{
    console.log("Server started on "+port);
})