const express = require("express");
const app = express();
const https= require("https");
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
const request = require("request");

//app.use(express.static("public"));

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html");
    

});
app.post("/", function(req,res){
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    
    const data= {
        members : [
        {
            email_address: email,
            status: "subscribed",
            merge_fields:{
                FNAME: firstName,
                LNAME: lastName
            }
        }
    ]};
    const jsonData = JSON.stringify(data);
    const url= "https://us21.api.mailchimp.com/3.0/lists/18fd2472df";
    const options= {
        method: "POST",
        auth: "shivangi:ab0fbc725e67232f1258dd6b905dc2af-us21"
    }

    const request = https.request(url,options, function(response){
        if(response.statusCode===200){
            res.sendFile(__dirname + "/success.html");
        }
        else{
            res.sendFile(__dirname + "/failure.html");
        }

        
    });
   request.end();

});
//app.post("/failure", function(req,res){
    //res.redirect("/");
//});
app.listen(3000, function () {
    console.log("Server running at 3000...");
});


// ab0fbc725e67232f1258dd6b905dc2af-us21
// audience id- 18fd2472df