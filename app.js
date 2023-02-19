const express = require('express')
const bodyParser = require("body-parser")
const request = require("request")
const https = require("https")

const app = express()

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
  res.sendFile(__dirname + "/signup.html");
})

app.post("/", function(req, res){
    var fName = req.body.firstName;
    var lName = req.body.lastName;
    var email = req.body.email;

    var data = {
      members: [
        {
          email_address: email,
          status: "subscribed",
          merge_fields:{
            FNAME: fName,
            LNAME: lName
          }
        }
      ]
    };

    var jsonData = JSON.stringify(data);

    const url = "https://us13.api.mailchimp.com/3.0/lists/d52706f461";


  const options = {
    method: "POST",
    auth: "ali:816f1353fb603c18894ffaf49a11b79f-us13"
  }



  const request = https.request(url, options, function(response){

      if(response.statusCode === 200){
        res.sendFile(__dirname + "/success.html")
      }else{
        res.send("Error")
      }

      request.on("data", function(data){
          console.log(JSON.parse(data));
      })
    })

    request.write(jsonData);
    request.end();

})


app.get("/failure", function(req,res){
  res.redirect("/");
})

app.listen(process.env.PORT || 8083, function(){
  console.log("Server up and running at 8083");
})


// API Key
// 816f1353fb603c18894ffaf49a11b79f-us13

// d52706f461