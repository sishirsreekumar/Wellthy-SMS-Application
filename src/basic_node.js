var express = require('express')
var request = require('request');

var app =express()
const port = process.env.PORT || 3000
// Parse JSON bodies (as sent by API clients)

app.use(express.urlencoded());


app.use(express.json());

app.get("/",(req,res)=>{
    console.log("Logged to site")
    res.send("Welcome")
})

app.post("/",(req,res)=>{
    res.send("Hello there")
    console.log(req.body)

    console.log("new body data",req.body.lead_mobile_number)
    console.log("new bodddy",typeof(req.body["lead_mobile_number"]))
    var phone=req.body["lead_mobile_number"]
    var message="You have missed a call.Give a call to this number to schedule an appointment."
    var options = {
        url:"https://api-alerts.kaleyra.com/v4/?api_key=A3cab820f8de4a0f03fb3ea65e50b62a0&method=sms&message="+message+"&to="+phone+"&sender=Welthy",
    
    };
    
    function callback(error, response, body) {

        if(error){
            console.log("ERRROR ",error)
            res.send("ERROR")
        }
        if (!error && response.statusCode == 200) {
            console.log(body);
        }
    }
    
    request(options, callback);



})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})