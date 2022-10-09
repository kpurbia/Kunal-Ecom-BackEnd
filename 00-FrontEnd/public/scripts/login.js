
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
            localStorage.clear();
            if(data[1] === "Customer"){
                localStorage.setItem("Authorization", data[0]);
                window.location.href = "/customer"
            } else if(data[1] === "Agent"){
                localStorage.setItem("Authorization", data[0]);
                window.location.href = "/agent"
            } else if(data[1] === "Vendor"){
                localStorage.setItem("Authorization", data[0]);
                window.location.href = "/vendor"
            } else if(data[1] === "Admin"){
                localStorage.setItem("Authorization", data[0]);
                window.location.href = "/admin"
            } else{
                document.getElementById("loginWarning").style.display = "block"
            }
        }
    });
}