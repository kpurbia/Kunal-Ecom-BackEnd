exports.home = function(req, res){
    foundItems = [{
        "source": "https://www.bing.com/images/search?view=detailV2&ccid=SqEICC59&id=08742626C0F57B6314CCB1172995434F4D0F2742&thid=OIP.SqEICC59PL1VrdefhGEqqgHaCg&mediaurl=https%3a%2f%2fpurepng.com%2fpublic%2fuploads%2flarge%2fpurepng.com-google-logo-2015brandlogobrand-logoiconssymbolslogosgoogle-6815229372333mqrr.png&exph=3382&expw=10000&q=google+img&simid=608020709349162776&FORM=IRPRST&ck=D8F9C50124E46C706FA35FCBE04E3F7D&selectedIndex=0",
        "description": "Hello I am google"
    },
    {
        "source": "https://www.bing.com/images/search?view=detailV2&ccid=SqEICC59&id=08742626C0F57B6314CCB1172995434F4D0F2742&thid=OIP.SqEICC59PL1VrdefhGEqqgHaCg&mediaurl=https%3a%2f%2fpurepng.com%2fpublic%2fuploads%2flarge%2fpurepng.com-google-logo-2015brandlogobrand-logoiconssymbolslogosgoogle-6815229372333mqrr.png&exph=3382&expw=10000&q=google+img&simid=608020709349162776&FORM=IRPRST&ck=D8F9C50124E46C706FA35FCBE04E3F7D&selectedIndex=0",
        "description": "Hello I am google"
    },
    {
        "source": "https://www.bing.com/images/search?view=detailV2&ccid=SqEICC59&id=08742626C0F57B6314CCB1172995434F4D0F2742&thid=OIP.SqEICC59PL1VrdefhGEqqgHaCg&mediaurl=https%3a%2f%2fpurepng.com%2fpublic%2fuploads%2flarge%2fpurepng.com-google-logo-2015brandlogobrand-logoiconssymbolslogosgoogle-6815229372333mqrr.png&exph=3382&expw=10000&q=google+img&simid=608020709349162776&FORM=IRPRST&ck=D8F9C50124E46C706FA35FCBE04E3F7D&selectedIndex=0",
        "description": "Hello I am google"
    },
    {
        "source": "https://www.bing.com/images/search?view=detailV2&ccid=SqEICC59&id=08742626C0F57B6314CCB1172995434F4D0F2742&thid=OIP.SqEICC59PL1VrdefhGEqqgHaCg&mediaurl=https%3a%2f%2fpurepng.com%2fpublic%2fuploads%2flarge%2fpurepng.com-google-logo-2015brandlogobrand-logoiconssymbolslogosgoogle-6815229372333mqrr.png&exph=3382&expw=10000&q=google+img&simid=608020709349162776&FORM=IRPRST&ck=D8F9C50124E46C706FA35FCBE04E3F7D&selectedIndex=0",
        "description": "Hello I am google"
    },
    {
        "source": "https://www.bing.com/images/search?view=detailV2&ccid=SqEICC59&id=08742626C0F57B6314CCB1172995434F4D0F2742&thid=OIP.SqEICC59PL1VrdefhGEqqgHaCg&mediaurl=https%3a%2f%2fpurepng.com%2fpublic%2fuploads%2flarge%2fpurepng.com-google-logo-2015brandlogobrand-logoiconssymbolslogosgoogle-6815229372333mqrr.png&exph=3382&expw=10000&q=google+img&simid=608020709349162776&FORM=IRPRST&ck=D8F9C50124E46C706FA35FCBE04E3F7D&selectedIndex=0",
        "description": "Hello I am google"
    },
    {
        "source": "https://www.bing.com/images/search?view=detailV2&ccid=SqEICC59&id=08742626C0F57B6314CCB1172995434F4D0F2742&thid=OIP.SqEICC59PL1VrdefhGEqqgHaCg&mediaurl=https%3a%2f%2fpurepng.com%2fpublic%2fuploads%2flarge%2fpurepng.com-google-logo-2015brandlogobrand-logoiconssymbolslogosgoogle-6815229372333mqrr.png&exph=3382&expw=10000&q=google+img&simid=608020709349162776&FORM=IRPRST&ck=D8F9C50124E46C706FA35FCBE04E3F7D&selectedIndex=0",
        "description": "Hello I am google"
    },
    {
        "source": "https://www.bing.com/images/search?view=detailV2&ccid=SqEICC59&id=08742626C0F57B6314CCB1172995434F4D0F2742&thid=OIP.SqEICC59PL1VrdefhGEqqgHaCg&mediaurl=https%3a%2f%2fpurepng.com%2fpublic%2fuploads%2flarge%2fpurepng.com-google-logo-2015brandlogobrand-logoiconssymbolslogosgoogle-6815229372333mqrr.png&exph=3382&expw=10000&q=google+img&simid=608020709349162776&FORM=IRPRST&ck=D8F9C50124E46C706FA35FCBE04E3F7D&selectedIndex=0",
        "description": "Hello I am google"
    },
    {
        "source": "https://www.bing.com/images/search?view=detailV2&ccid=SqEICC59&id=08742626C0F57B6314CCB1172995434F4D0F2742&thid=OIP.SqEICC59PL1VrdefhGEqqgHaCg&mediaurl=https%3a%2f%2fpurepng.com%2fpublic%2fuploads%2flarge%2fpurepng.com-google-logo-2015brandlogobrand-logoiconssymbolslogosgoogle-6815229372333mqrr.png&exph=3382&expw=10000&q=google+img&simid=608020709349162776&FORM=IRPRST&ck=D8F9C50124E46C706FA35FCBE04E3F7D&selectedIndex=0",
        "description": "Hello I am google"
    },
    {
        "source": "https://www.bing.com/images/search?view=detailV2&ccid=SqEICC59&id=08742626C0F57B6314CCB1172995434F4D0F2742&thid=OIP.SqEICC59PL1VrdefhGEqqgHaCg&mediaurl=https%3a%2f%2fpurepng.com%2fpublic%2fuploads%2flarge%2fpurepng.com-google-logo-2015brandlogobrand-logoiconssymbolslogosgoogle-6815229372333mqrr.png&exph=3382&expw=10000&q=google+img&simid=608020709349162776&FORM=IRPRST&ck=D8F9C50124E46C706FA35FCBE04E3F7D&selectedIndex=0",
        "description": "Hello I am google"
    }]
    
    res.render("home.ejs", {newItems: foundItems});
}

exports.login = function(req, res){
    res.render("login")
}