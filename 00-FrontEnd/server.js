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
app.get("/customer/register", (req, res)=>{
    res.sendFile(__dirname + '/public/registration/registerCustomer.html');
});
app.get("/vendor/register", (req, res)=>{
    res.sendFile(__dirname + '/public/registration/registerVendor.html');
});
app.get("/agent/register", (req, res)=>{
    res.sendFile(__dirname + '/public/registration/registerAgent.html');
});
app.get("/admin/register", (req, res)=>{
    res.sendFile(__dirname + '/public/registration/registerAdmin.html');
});
app.listen(3000, ()=>{
    console.log("Server listening on 3000");
})