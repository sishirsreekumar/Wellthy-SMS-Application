var express = require('express')
var rr2 = require('request');

var app =express()

// Parse JSON bodies (as sent by API clients)

app.use(express.urlencoded());


app.use(express.json());



app.post("/",(req,res)=>{
    res.send("Hello there")
    // res.send(req)
    console.log(req.body)

    console.log("new bodddy",req.body['lead_mobile_number'])
    console.log("new bodddy",typeof(req.body["lead_mobile_number"]))
    var phone=req.body["lead_mobile_number"]
    var message="You have missed a call.Give a call to this number to schedule an appointment."
    var options = {
        url:"https://api-alerts.kaleyra.com/v4/?api_key=A3cab820f8de4a0f03fb3ea65e50b62a0&method=sms&message="+message+"&to="+phone+"&sender=Welthy",
    };
    
    function callback(error, response, body) {

        if(error){
            console.log("ERRROR ",error)
        }
        if (!error && response.statusCode == 200) {
            console.log(body);
        }
    }
    
    rr2(options, callback);



})
app.listen(8080,()=>{

    console.log("site is live")

})