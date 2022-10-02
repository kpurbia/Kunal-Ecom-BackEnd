const userRoutes = require('./routes/userRoutes')
const vendorRoutes = require('./routes/vendorRoutes');
const customerRoutes = require('./routes/customerRoutes');
const agentRoutes = require('./routes/agentRoutes');
const express = require('express');
const app = express();
const port = 3000;

//Setting Middlewares
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.set("view engine", "ejs");
app.use(express.static("public"));

//Initializing router
userRoutes(app)
vendorRoutes(app);
customerRoutes(app);
// agentRoutes(app);

//Starting server
app.listen(port, ()=>{
    console.log("Server started on "+port);
})