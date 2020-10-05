var express = require('express')
var request = require('request');

var app =express()
// Process.env.port stores the port Heroku uses to listen 3000 is the default port
const port = process.env.PORT || 3000


// Parse JSON bodies (as sent by API clients)
app.use(express.urlencoded());
app.use(express.json());

app.get("/",(req,res)=>{
    console.log("Logged to site")
    res.send("<h1>Webhook Server</h1>")
})

app.post("/",(req,res)=>{
    res.send("Hello there")
    console.log(req.body)
    console.log("new body data",req.body.lead_mobile_number)
    var phone=req.body["lead_mobile_number"]
    //var n = req.body["lead_cf_number_of_times_called"]
    var rnr = req.body["lead_cf_number_of_times_rnr"]
    var cb = req.body["lead_cf_number_of_time_call_back"]
    var call_status = req.body["lead_cf_onboarding_remarks"]
    var campaign = req.body["lead_cf_campaign"]
    if (campaign == "Accu-Chek Active strips pack for new users" || campaign == "Accu-Chek Active meter pack for new users"){
        if (call_status == "Ringing"){
            console.log("Inside 1st if block ")
            if (rnr == 1){
                var message="You seem to be missing out on a lot of action. But I can help you catch up! Tap https://wellthy.page.link/XXEk to connect over Health Coach chat."
                var campaign = "RNR1"
            } else if (rnr == 2) {
                var message = "Basmati rice helps in keeping blood sugar under check. Need some more quick & easy tips? Your Health Coach can help! Tap https://wellthy.page.link/XXEk to chat with them now!"
                var campaign = "RNR2"
            } else if (rnr ==3) {
                var message = "You're one step away from getting your meals and activities in order. Tap https://wellthy.page.link/XXEk to chat with your Health Coach now! "
                var campaign  = "RNR3"
            } else if (rnr == 4) {
                var message = "Did you know cinnamon could help keep your blood sugar in control? Tap https://wellthy.page.link/XXEk to talk to your Health Coach for more tips!"
                var campaign = "RNR4"
            } else if (rnr == 5) {
                var message = "Can't talk right now? Let's chat! Tap https://wellthy.page.link/XXEk to connect with your Health Coach on chat."
                var campaign = "RNR5"
            } else if (rnr == 6) {
                var message = "Your health coach wants to talk to you about which exercises help improve blood sugar.Tap https://wellthy.page.link/XXEk to connect over chat."
                var campaign = "RNR6"
            } else if (rnr == 7) {
                var message = "There's so much to know about managing your condition! Tap https://wellthy.page.link/XXEk to have a quick chat with your Health Coach. "
                var campaign = "RNR7"
            }
        }

        if (call_status == "Call Back"){
            console.log("Inside 2nd if block ")
            if (cb == 1){
                var message = "Until we speak again, how about connecting over chat. Tap https://wellthy.page.link/XXEk to chat with your Health Coach & get interesting insights!"
                var campaign = "CallBack1"
            } else if (cb == 2) {
                var message = "It's been a while since we last spoke. Until we speak again, how about a quick chat. Tap https://wellthy.page.link/XXEk to connect."
                var campaign = "CallBack2"
            } else if (cb == 3) {
                var message = "Tap https://wellthy.page.link/XXEk for tips from your Health Coach on managing your life with diet & exercise."
                var campaign  = "CallBack3"
            }
        }
    }
    console.log("TO Remarks: ",req.body.lead_cf_onboarding_remarks)
    console.log("RNR Number: ",req.body.lead_cf_number_of_times_rnr)
    console.log("CallBack Number ",req.body.lead_cf_number_of_time_call_back)
    console.log("Campaign: ", campaign)
    var options = {
        url:"https://api-alerts.kaleyra.com/v4/?api_key=A3cab820f8de4a0f03fb3ea65e50b62a0&method=sms&message="+message+"&to="+phone+"&sender=Welthy&campaign="+campaign,
    
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