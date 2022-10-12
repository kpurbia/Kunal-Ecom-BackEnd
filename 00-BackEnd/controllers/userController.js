import jwt from 'jsonwebtoken';

export default class User {

    //////////////////////////////////////////////////////Creating Dependency Injection
    constructor(mgr){
        this.userManager = mgr;
    }

    //////////////////////////////////////////////////////Login User using User Table
    userLogin = async (req, res) => {
        let userDetail = req.body;
        let foundUser = await this.userManager.login(userDetail);
        if (foundUser.length == 1) {
            let data = {};
            data.userId = foundUser[0].user_id;
            data.user = foundUser[0].user_name;
            data.email = foundUser[0].user_email;
            data.role = foundUser[0].user_role;

            let token = jwt.sign(data, process.env.TOKEN_SECRET);
            let frontEndData = []
            frontEndData.push(token);
            frontEndData.push(data.role);
            res.send(frontEndData);
        } else {
            res.send("User Not Found");
        }
    }
}






// exports.home = function (req, res) {
//     foundItems = [{
//         "source": "https://www.bing.com/images/search?view=detailV2&ccid=SqEICC59&id=08742626C0F57B6314CCB1172995434F4D0F2742&thid=OIP.SqEICC59PL1VrdefhGEqqgHaCg&mediaurl=https%3a%2f%2fpurepng.com%2fpublic%2fuploads%2flarge%2fpurepng.com-google-logo-2015brandlogobrand-logoiconssymbolslogosgoogle-6815229372333mqrr.png&exph=3382&expw=10000&q=google+img&simid=608020709349162776&FORM=IRPRST&ck=D8F9C50124E46C706FA35FCBE04E3F7D&selectedIndex=0",
//         "description": "Hello I am google"
//     },
//     {
//         "source": "https://www.bing.com/images/search?view=detailV2&ccid=SqEICC59&id=08742626C0F57B6314CCB1172995434F4D0F2742&thid=OIP.SqEICC59PL1VrdefhGEqqgHaCg&mediaurl=https%3a%2f%2fpurepng.com%2fpublic%2fuploads%2flarge%2fpurepng.com-google-logo-2015brandlogobrand-logoiconssymbolslogosgoogle-6815229372333mqrr.png&exph=3382&expw=10000&q=google+img&simid=608020709349162776&FORM=IRPRST&ck=D8F9C50124E46C706FA35FCBE04E3F7D&selectedIndex=0",
//         "description": "Hello I am google"
//     },
//     {
//         "source": "https://www.bing.com/images/search?view=detailV2&ccid=SqEICC59&id=08742626C0F57B6314CCB1172995434F4D0F2742&thid=OIP.SqEICC59PL1VrdefhGEqqgHaCg&mediaurl=https%3a%2f%2fpurepng.com%2fpublic%2fuploads%2flarge%2fpurepng.com-google-logo-2015brandlogobrand-logoiconssymbolslogosgoogle-6815229372333mqrr.png&exph=3382&expw=10000&q=google+img&simid=608020709349162776&FORM=IRPRST&ck=D8F9C50124E46C706FA35FCBE04E3F7D&selectedIndex=0",
//         "description": "Hello I am google"
//     },
//     {
//         "source": "https://www.bing.com/images/search?view=detailV2&ccid=SqEICC59&id=08742626C0F57B6314CCB1172995434F4D0F2742&thid=OIP.SqEICC59PL1VrdefhGEqqgHaCg&mediaurl=https%3a%2f%2fpurepng.com%2fpublic%2fuploads%2flarge%2fpurepng.com-google-logo-2015brandlogobrand-logoiconssymbolslogosgoogle-6815229372333mqrr.png&exph=3382&expw=10000&q=google+img&simid=608020709349162776&FORM=IRPRST&ck=D8F9C50124E46C706FA35FCBE04E3F7D&selectedIndex=0",
//         "description": "Hello I am google"
//     },
//     {
//         "source": "https://www.bing.com/images/search?view=detailV2&ccid=SqEICC59&id=08742626C0F57B6314CCB1172995434F4D0F2742&thid=OIP.SqEICC59PL1VrdefhGEqqgHaCg&mediaurl=https%3a%2f%2fpurepng.com%2fpublic%2fuploads%2flarge%2fpurepng.com-google-logo-2015brandlogobrand-logoiconssymbolslogosgoogle-6815229372333mqrr.png&exph=3382&expw=10000&q=google+img&simid=608020709349162776&FORM=IRPRST&ck=D8F9C50124E46C706FA35FCBE04E3F7D&selectedIndex=0",
//         "description": "Hello I am google"
//     },
//     {
//         "source": "https://www.bing.com/images/search?view=detailV2&ccid=SqEICC59&id=08742626C0F57B6314CCB1172995434F4D0F2742&thid=OIP.SqEICC59PL1VrdefhGEqqgHaCg&mediaurl=https%3a%2f%2fpurepng.com%2fpublic%2fuploads%2flarge%2fpurepng.com-google-logo-2015brandlogobrand-logoiconssymbolslogosgoogle-6815229372333mqrr.png&exph=3382&expw=10000&q=google+img&simid=608020709349162776&FORM=IRPRST&ck=D8F9C50124E46C706FA35FCBE04E3F7D&selectedIndex=0",
//         "description": "Hello I am google"
//     },
//     {
//         "source": "https://www.bing.com/images/search?view=detailV2&ccid=SqEICC59&id=08742626C0F57B6314CCB1172995434F4D0F2742&thid=OIP.SqEICC59PL1VrdefhGEqqgHaCg&mediaurl=https%3a%2f%2fpurepng.com%2fpublic%2fuploads%2flarge%2fpurepng.com-google-logo-2015brandlogobrand-logoiconssymbolslogosgoogle-6815229372333mqrr.png&exph=3382&expw=10000&q=google+img&simid=608020709349162776&FORM=IRPRST&ck=D8F9C50124E46C706FA35FCBE04E3F7D&selectedIndex=0",
//         "description": "Hello I am google"
//     },
//     {
//         "source": "https://www.bing.com/images/search?view=detailV2&ccid=SqEICC59&id=08742626C0F57B6314CCB1172995434F4D0F2742&thid=OIP.SqEICC59PL1VrdefhGEqqgHaCg&mediaurl=https%3a%2f%2fpurepng.com%2fpublic%2fuploads%2flarge%2fpurepng.com-google-logo-2015brandlogobrand-logoiconssymbolslogosgoogle-6815229372333mqrr.png&exph=3382&expw=10000&q=google+img&simid=608020709349162776&FORM=IRPRST&ck=D8F9C50124E46C706FA35FCBE04E3F7D&selectedIndex=0",
//         "description": "Hello I am google"
//     },
//     {
//         "source": "https://www.bing.com/images/search?view=detailV2&ccid=SqEICC59&id=08742626C0F57B6314CCB1172995434F4D0F2742&thid=OIP.SqEICC59PL1VrdefhGEqqgHaCg&mediaurl=https%3a%2f%2fpurepng.com%2fpublic%2fuploads%2flarge%2fpurepng.com-google-logo-2015brandlogobrand-logoiconssymbolslogosgoogle-6815229372333mqrr.png&exph=3382&expw=10000&q=google+img&simid=608020709349162776&FORM=IRPRST&ck=D8F9C50124E46C706FA35FCBE04E3F7D&selectedIndex=0",
//         "description": "Hello I am google"
//     }]

//     res.send("home.ejs", { newItems: foundItems });
// }

// exports.loginForm = function (req, res) {
//     res.send("login");
// }