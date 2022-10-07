const userRoutes = require('./routes/userRoutes')
const vendorRoutes = require('./routes/vendorRoutes');
const customerRoutes = require('./routes/customerRoutes');
const agentRoutes = require('./routes/agentRoutes');
const adminRoutes = require('./routes/adminRoutes');
const express = require('express');
const session = require('express-session');
const cookie = require('cookie-parser');
const app = express();
const port = 7000;
const cors=require('cors');

//USE THEM WHERE REQUIRED
// const jwt=require('jsonwebtoken');
// let jwtSecretKey="I_am_a_top_secret";

//Setting Middlewares
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cors());
app.use(cookie());

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}));

//Initializing router
userRoutes(app);
vendorRoutes(app);
customerRoutes(app);
agentRoutes(app);
adminRoutes(app)

//Starting server
app.listen(port, ()=>{
    console.log("Server started on "+port);
})