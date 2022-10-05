
var doLogin = () => {
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let credential = {};
    credential.email = email;
    credential.password = password;

    credential = JSON.stringify(credential);
    let loginURL = "http://localhost:7000/login"

    $.ajax({
        contentType: "application/json",
        url: loginURL,
        type: "POST",
        data: credential,
        timeout: 15000,
        success: (data, status) => {
            if(data[0].user_role === "Customer"){
                console.log("Customer");
            } else if(data[0].user_role === "Agent"){
                console.log("Agent");
            } else if(data[0].user_role === "Vendor"){
                console.log("Vendor");
            } else if(data[0].user_role === "Admin"){
                console.log("Admin");
            } else{
                console.log("Hello");
            }
        }
    });
}