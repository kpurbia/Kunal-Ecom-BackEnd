const vendorRoutes = require('./routes/vendorroutes');
const userRoutes = require('./routes/userroutes');
const agentRoutes = require('./routes/agentroutes');
const express = require('express');
const app = express();
const port = 3000;

//Setting Middlewares
app.use(express.urlencoded({extended: true}));
app.use(express.json());

//Initializing router
vendorRoutes(app);
userRoutes(app);
agentRoutes(app);

//Starting server
app.listen(port, ()=>{
    console.log("Server started on "+port);
})