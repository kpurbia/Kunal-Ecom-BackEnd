import env from 'dotenv';
import express from 'express';
import cors from 'cors';
import session from 'express-session';
import cookieParser from 'cookie-parser';

import userRoutes from './routes/userRoutes.js';
import vendorRoutes from './routes/vendorRoutes.js';
import customerRoutes from './routes/customerRoutes.js';
import agentRoutes from './routes/agentRoutes.js';
import adminRoutes from './routes/adminRoutes.js';

const app = express();
const port = 7000;
env.config();

//Age of cookie for one day
const oneDay = 1000 * 60 * 60 * 24;

//Setting session
app.use(session({
    secret: process.env.SESSION_SECRET,
    cookie:{maxAge: oneDay},
    saveUninitialized: false,
    resave: false
}));

//Setting Middlewares
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cors());
app.use(cookieParser());

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