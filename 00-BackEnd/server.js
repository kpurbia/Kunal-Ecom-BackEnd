const userRoutes = require('./routes/userRoutes')
const vendorRoutes = require('./routes/vendorRoutes');
const customerRoutes = require('./routes/customerRoutes');
const agentRoutes = require('./routes/agentRoutes');
const adminRoutes = require('./routes/adminRoutes');
const express = require('express');
const app = express();
const port = 9000;

//Setting Middlewares
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.set("view engine", "ejs");
app.use(express.static("public"));

//Initializing router
// userRoutes(app);
vendorRoutes(app);
customerRoutes(app);
agentRoutes(app);
adminRoutes(app)

//Starting server
app.listen(port, ()=>{
    console.log("Server started on "+port);
})