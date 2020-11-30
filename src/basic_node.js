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
    //console.log("new body data",req.body.contact_mobile_number)
    var phone=req.body["lead_mobile_number"]
    var name = req.body["lead_first_name"]
    //var n = req.body["lead_cf_number_of_times_called"]
    var rnr = req.body["lead_cf_number_of_times_rnr"]
    //var number_of_times_called = req.body["lead_cf_number_of_times_called"]
    var cb = req.body["lead_cf_number_of_times_call_back"]
    var call_status = req.body["lead_cf_onboarding_remarks"]
    var client= req.body["lead_cf_client"]
    var campaign = req.body["lead_cf_campaign"]
    var policy_number = req.body["lead_cf_policy_number"]
    //var poilcy_name = req.body["lead_cf_campaign"]

    if (client == "Manipal Cigna" && (call_status == "Ringing No Response" || call_status == "Not Interested" ||  call_status == "Interested - No Consent for Test" || call_status == "Interested - Valid Medical Test" || call_status == "Interested - Call Back" || call_status == "Interested - Medical Test Apnt" )) {
        //console.log("Inside 2nd if block ")
        if (call_status !== "Ringing No Response" && call_status !== "Interested - Call Back"){
           // console.log("Inside 3rd if block ")
            if (call_status == "Not Interested"){
                var message = "Welcome to the Proheal Program!: Dear Policy holder: "+policy_number+", Thanks for your value time over the call! Enjoy free quick tips on Lifestyle Management. Remember to watch this space!  Powered by Manipal Cigna | Wellthy Care"
                var campaign = "NI1"
                var options = {
                    url:"https://api-alerts.kaleyra.com/v4/?api_key=A3cab820f8de4a0f03fb3ea65e50b62a0&method=sms&message="+message+"&to="+phone+"&sender=Welthy&campaign="+campaign
                
                };
            }
            if (call_status == "Interested - No Consent for Test"){
                var message= "Welcome Aboard!!  Dear Policy holder: "+policy_number+", let us know a suitable time when you wish to go for the medical test. Give us a ring on <02249668867>. Powered by Manipal Cigna | Wellthy Care"
                var campaign = "INC"
                var options = {
                    url:"https://api-alerts.kaleyra.com/v4/?api_key=A3cab820f8de4a0f03fb3ea65e50b62a0&method=sms&message="+message+"&to="+phone+"&sender=Welthy&campaign="+campaign
                
                };
            }
            if (call_status == "Interested - Valid Medical Test"){
                var message= "Welcome Aboard!!  Dear Policy holder: "+policy_number+", let's start the journey towards a healthier and happier YOU! Powered by Manipal Cigna | Wellthy Care"
                var campaign = "IMT1"
                var options = {
                    url:"https://api-alerts.kaleyra.com/v4/?api_key=A3cab820f8de4a0f03fb3ea65e50b62a0&method=sms&message="+message+"&to="+phone+"&sender=Welthy&campaign="+campaign
                
                };
                var message= "Hey "+name+", thanks for confirming to be a part of Proheal Program. Kindly click on the <link> to document your consent for us to proceed for your medical tests!!"
                var campaign = "IMT2"
                var options = {
                    url:"https://api-alerts.kaleyra.com/v4/?api_key=A3cab820f8de4a0f03fb3ea65e50b62a0&method=sms&message="+message+"&to="+phone+"&sender=Welthy&campaign="+campaign
                
                };
            }
            if (call_status == "Interested - Medical Test Apnt"){
                var message= "Welcome Aboard!!  Dear Policy holder: "+policy_number+", let's start the journey towards a healthier and happier YOU! Powered by Manipal Cigna | Wellthy Care"
                var campaign = "IMTA1"
                var options = {
                    url:"https://api-alerts.kaleyra.com/v4/?api_key=A3cab820f8de4a0f03fb3ea65e50b62a0&method=sms&message="+message+"&to="+phone+"&sender=Welthy&campaign="+campaign
                
                };
                var message= "Hey "+name+", thanks for confirming to be a part of Proheal Program. Kindly click on the <link> to document your consent for us to proceed for your medical tests!!"
                var campaign = "IMTA2"
                var options = {
                    url:"https://api-alerts.kaleyra.com/v4/?api_key=A3cab820f8de4a0f03fb3ea65e50b62a0&method=sms&message="+message+"&to="+phone+"&sender=Welthy&campaign="+campaign
                
                };
            }
            
        }
        
        if (call_status == "Ringing No Response" && rnr < 5){
            //console.log("Inside 1st if block ")
            if (rnr == 1){
                var message="Welcome to the Proheal Program: Dear Policy holder :"+policy_number+" Let’s begin the journey 🧗 towards a healthier YOU 👍! Please tap https://bit.ly/3mzLY6N to know more about the Proheal Program! Powered by Manipal Cigna | Wellthy Care"
                var campaign = "RNR1"
            } if (rnr == 2) {
                var message = "Seems like you missed our call. That's okay! Give us a call on <02249668867>."
                var campaign = "RNR2"
            } else if (rnr ==3) {
                var message = "Hi, I am <name of TS associated with Cigna program>. I will help you with activating the Proheal Program. Please block a suitable time  and I will call you. I promise it will not take more than 5 mins :)"
                var campaign  = "RNR3"
            } else if (rnr == 4) {
                var message = "Did you see our email with Lifestyle Management tips? To continue with these tips and more information on better managing your health, ring us at <02249668867>."
                var campaign = "RNR4"
            } /*else if (rnr == 5) {
                var message = "Can't talk right now? Let's chat! Tap https://wellthy.page.link/XXEk to connect with your Health Coach on chat."
                var campaign = "RNR5"
            } else if (rnr == 6) {
                var message = "Your health coach wants to talk to you about which exercises help improve blood sugar.Tap https://wellthy.page.link/XXEk to connect over chat."
                var campaign = "RNR6"
            } else if (rnr == 7) {
                var message = "There's so much to know about managing your condition! Tap https://wellthy.page.link/XXEk to have a quick chat with your Health Coach. "
                var campaign = "RNR7"
            }*/
            var options = {
                url:"https://api-alerts.kaleyra.com/v4/?api_key=A3cab820f8de4a0f03fb3ea65e50b62a0&method=sms&message="+message+"&to="+phone+"&sender=Welthy&campaign="+campaign
            
            };
        }

 
        if (call_status == "Interested - Call Back" && cb < 6){
           // console.log("Inside 2nd if block ")
            if (cb == 1){
                var message = "Welcome to the Proheal Program: Dear Policy holder :"+policy_number+" Let’s begin the journey 🧗 towards a healthier YOU 👍! Please tap https://bit.ly/3mzLY6N to know more about the Proheal Program! Powered by Manipal Cigna | Wellthy Care"
                var campaign = "CallBack1"
            } else if (cb == 2) {
                var message = "Seems like you missed our call. That's okay! Give us a call on <02249668867>."
                var campaign = "CallBack2"
            } else if (cb == 3) {
                var message = "Hi, I am <name of TS associated with Cigna program>. I will help you with activating the Proheal Program. Please block a suitable time <link> and I will call you. I promise it will not take more than 5 mins :)"
                var campaign  = "CallBack3"
            } else if (cb == 4) {
                var message = "Did you see our email with Lifestyle Management tips? To continue with these tips and more information on better managing your health, ring us at <02249668867>."
                var campaign  = "CallBack4"
            } else if (cb == 5) {
                var message = "Seems like you missed our call. That's okay! Give us a call on <02249668867>."
                var campaign  = "CallBack5"
            }
            var options = {
                url:"https://api-alerts.kaleyra.com/v4/?api_key=A3cab820f8de4a0f03fb3ea65e50b62a0&method=sms&message="+message+"&to="+phone+"&sender=Welthy&campaign="+campaign
            
            };
        }

        
    }
    //console.log("TO Remarks: ",req.body.lead_cf_onboarding_remarks)
    //console.log("RNR Number: ",req.body.lead_cf_number_of_times_rnr)
    //console.log("CallBack Number ",req.body.lead_cf_number_of_time_call_back)
    //console.log("Campaign: ", campaign)
    
    
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