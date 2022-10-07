var registerAgent = () => {
    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let password2 = document.getElementById("password2").value;
    let govtid = document.getElementById("govtid").value;
    let contact = document.getElementById("contact").value;
    let state = document.getElementById("state").value;
    let city = document.getElementById("city").value;
    if (name == "" || email === "" || password === "" || password2 === "" || govtid === "" || contact === "" || state === "" || city === "") {
        document.getElementById("detailWarning").style.display = "block";
    } else {
        if (password === password2) {
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

            let registerURL = "http://localhost:7000/agent/register"
            $.ajax({
                contentType: "application/json",
                url: registerURL,
                type: "POST",
                data: userDetail,
                timeout: 15000,
                success: (data, status) => {
                    if (data === "Email already registered") {
                        document.getElementById("detailWarning").style.display = "none";
                        document.getElementById("passwordWarning").style.display = "none";
                        document.getElementById("idWarning").style.display = "none";
                        document.getElementById("emailWarning").style.display = "block";
                    } else {
                        if (data === "Id already registered") {
                            document.getElementById("detailWarning").style.display = "none";
                            document.getElementById("passwordWarning").style.display = "none";
                            document.getElementById("idWarning").style.display = "block";
                            document.getElementById("emailWarning").style.display = "none";
                        } else {
                            window.location.href = "/login";
                            
                        }
                    }
                }
            });
        } else {
            document.getElementById("detailWarning").style.display = "none";
            document.getElementById("passwordWarning").style.display = "block";
        }
    }
}

var registerVendor = () => {
    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let password2 = document.getElementById("password2").value;
    let govtid = document.getElementById("govtid").value;
    let category = document.getElementById("category").value;
    let contact = document.getElementById("contact").value;
    let state = document.getElementById("state").value;
    let city = document.getElementById("city").value;
    if (name == "" || email === "" || password === "" || password2 === "" || govtid === "" || category === "" || contact === "" || state === "" || city === "") {
        document.getElementById("detailWarning").style.display = "block";
    } else {
        if (password === password2) {
            let userDetail = {};
            userDetail.name = name;
            userDetail.email = email;
            userDetail.password = password;
            userDetail.password2 = password2;
            userDetail.govtid = govtid;
            userDetail.category = category;
            userDetail.contact = contact;
            userDetail.state = state;
            userDetail.city = city;

            userDetail = JSON.stringify(userDetail);

            let registerURL = "http://localhost:7000/vendor/register"
            $.ajax({
                contentType: "application/json",
                url: registerURL,
                type: "POST",
                data: userDetail,
                timeout: 15000,
                success: (data, status) => {
                    if (data === "Email already registered") {
                        document.getElementById("detailWarning").style.display = "none";
                        document.getElementById("passwordWarning").style.display = "none";
                        document.getElementById("idWarning").style.display = "none";
                        document.getElementById("emailWarning").style.display = "block";
                    } else {
                        if (data === "Id already registered") {
                            document.getElementById("detailWarning").style.display = "none";
                            document.getElementById("passwordWarning").style.display = "none";
                            document.getElementById("idWarning").style.display = "block";
                            document.getElementById("emailWarning").style.display = "none";
                        } else {
                            window.location.href = "/login";
                        }
                    }
                }
            });
        } else {
            document.getElementById("detailWarning").style.display = "none";
            document.getElementById("passwordWarning").style.display = "block";
        }
    }
}

var registerCustomer = () => {
    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let password2 = document.getElementById("password2").value;
    let contact = document.getElementById("contact").value;
    let state = document.getElementById("state").value;
    let city = document.getElementById("city").value;
    if (name == "" || email === "" || password === "" || password2 === "" || contact === "" || state === "" || city === "") {
        document.getElementById("detailWarning").style.display = "block";
    } else {
        if (password === password2) {
            let userDetail = {};
            userDetail.name = name;
            userDetail.email = email;
            userDetail.password = password;
            userDetail.password2 = password2;
            userDetail.contact = contact;
            userDetail.state = state;
            userDetail.city = city;

            userDetail = JSON.stringify(userDetail);

            let registerURL = "http://localhost:7000/customer/register"
            $.ajax({
                contentType: "application/json",
                url: registerURL,
                type: "POST",
                data: userDetail,
                timeout: 15000,
                success: (data, status) => {
                    if (data === "Email already registered") {
                        document.getElementById("detailWarning").style.display = "none";
                        document.getElementById("passwordWarning").style.display = "none";
                        document.getElementById("emailWarning").style.display = "block"
                    } else {
                        window.location.href = "/login";
                    }
                }
            });
        } else {
            document.getElementById("detailWarning").style.display = "none";
            document.getElementById("passwordWarning").style.display = "block";
        }
    }
}

var registerAdmin = () => {
    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let password2 = document.getElementById("password2").value;
    let comapnyid = document.getElementById("companyid").value;
    let contact = document.getElementById("contact").value;
    let state = document.getElementById("state").value;
    let city = document.getElementById("city").value;
    if (name == "" || email === "" || password === "" || password2 === "" || comapnyid === "" || contact === "" || state === "" || city === "") {
        document.getElementById("detailWarning").style.display = "block";
    } else {
        if (password === password2) {
            let userDetail = {};
            userDetail.name = name;
            userDetail.companyid = comapnyid;
            userDetail.email = email;
            userDetail.password = password;
            userDetail.password2 = password2;
            userDetail.contact = contact;
            userDetail.state = state;
            userDetail.city = city;

            userDetail = JSON.stringify(userDetail);

            let registerURL = "http://localhost:7000/admin/register"
            $.ajax({
                contentType: "application/json",
                url: registerURL,
                type: "POST",
                data: userDetail,
                timeout: 15000,
                success: (data, status) => {
                    if (data === "Email already registered") {
                        document.getElementById("detailWarning").style.display = "none";
                        document.getElementById("passwordWarning").style.display = "none";
                        document.getElementById("idWarning").style.display = "none";
                        document.getElementById("emailWarning").style.display = "block";
                    } else {
                        if (data === "Id already registered") {
                            document.getElementById("detailWarning").style.display = "none";
                            document.getElementById("passwordWarning").style.display = "none";
                            document.getElementById("idWarning").style.display = "block";
                            document.getElementById("emailWarning").style.display = "none";
                        } else {
                            window.location.href = "/login";
                        }
                    }
                }
            });
        } else {
            document.getElementById("detailWarning").style.display = "none";
            document.getElementById("passwordWarning").style.display = "block";
        }
    }
}
