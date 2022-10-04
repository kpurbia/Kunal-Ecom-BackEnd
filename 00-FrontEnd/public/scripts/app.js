var getProducts = () =>{
    alert("Home");
}

var registerAgent = () =>{
    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let password2 = document.getElementById("password2").value;
    let govtid = document.getElementById("govtid").value;
    let contact = document.getElementById("contact").value;
    let state = document.getElementById("state").value;
    let city = document.getElementById("city").value;
    if(password === password2){
        let userDetail = {};
        userDetail.name = name;
        userDetail.email = email;
        userDetail.password = password;
        userDetail.password2 = password2;
        userDetail.govtid = govtid;
        userDetail.contact = contact;
        userDetail.state = state;
        userDetail.city = city;
        
        userDetail = JSON.stringify(userDetail);
        console.log(userDetail);

        let registerURL = "http://localhost:7000/agent/register"
        $.ajax({
            contentType: "application/json",
            url: registerURL,
            type: "POST",
            data: userDetail,
            timeout: 15000,
            success: (data, status)=>{
                console.log("on successfull login");
                console.log(status);
                console.log(data);
            }
        });
    } else{
        document.getElementById("alert").style.display = "block";
    }
} 

var registerVendor = () =>{
    alert("Vendor")
}

var registerCustomer = () =>{
    alert("Customer")
}

var registerAdmin = () =>{
    alert("Admin");
}
