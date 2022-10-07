
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
            if(data.role === "Customer"){
                window.location.href = "/customer"
            } else if(data.role === "Agent"){
                window.location.href = "/agent"
            } else if(data.role === "Vendor"){
                window.location.href = "/vendor"
            } else if(data.role === "Admin"){
                window.location.href = "/admin"
            } else{
                document.getElementById("loginWarning").style.display = "block"
            }
        }
    });
}