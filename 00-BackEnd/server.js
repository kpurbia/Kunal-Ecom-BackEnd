const env = require('dotenv');
const express = require('express');
const cors=require('cors');
const session = require('express-session');
const cookie = require('cookie-parser');

const userRoutes = require('./routes/userRoutes')
const vendorRoutes = require('./routes/vendorRoutes');
const customerRoutes = require('./routes/customerRoutes');
const agentRoutes = require('./routes/agentRoutes');
const adminRoutes = require('./routes/adminRoutes');


const app = express();
const port = 7000;

//Setting Middlewares
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cors());
app.use(cookie());
env.config();

app.use(session({
    secret: process.env.SESSION_SECRET,
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