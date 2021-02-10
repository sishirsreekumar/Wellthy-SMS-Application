var express = require('express')
var request = require('request');

var app =express()
// Process.env.port stores the port Heroku uses to listen 3000 is the default port
const port = process.env.PORT || 3000


// Parse JSON bodies (as sent by API clients)
app.use(express.urlencoded({ extended: true }));
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
    //var rnr = req.body["lead_cf_number_of_times_rnr"]
    //var number_of_times_called = req.body["lead_cf_number_of_times_called"]
    //var cb = req.body["lead_cf_number_of_time_call_back"]
    //var int_nc = req.body["lead_cf_number_of_time_interested_no_consent"]
    //var call_status = req.body["lead_cf_onboarding_remarks"]
    //var client= req.body["lead_cf_client"]
    //var campaign = req.body["lead_cf_campaign"]
    var policy_number = req.body["lead_cf_policy_number"]
    var message_type = req.body["lead_cf_cigna_message_type"]
    //var poilcy_name = req.body["lead_cf_campaign"]
    //console.log("Campaign: ", campaign)
    if ( message_type == "Enrollment steps" ) {
        var message= "2 simple steps to enroll in Manipal Cigna Proheal program. 1. Click on the https://t.me/ManipalCignaBot 2. Send us a \'Hi\' with your name and phone number.ManipalCigna"
        var campaign = "CIGNA-ENROLLMENT"
        var options = {
                    url:"https://api-alerts.kaleyra.com/v4/?api_key=A3cab820f8de4a0f03fb3ea65e50b62a0&method=sms&message="+message+"&to="+phone+"&sender=MCHICL&custom="+campaign
                }
                request(options, callback)
    }
    if ( message_type == "Welcome Message - General" ) {
        var message = "Dear Policy holder: "+policy_number+", Let\'s begin the journey towards a healthier YOU. Please tap https://bit.ly/35Zpcj2 to know about the Proheal Program! By ManipalCigna."
        //var message = "Dear Policy holder: "+policy_number+", Let’s begin the journey towards a healthier YOU. Please tap https://bit.ly/3mzLY6N to know about the Proheal Program! By Manipal Cigna."
        var campaign = "CIGNA-WELCOME"
        var options = {
            url:"https://api-alerts.kaleyra.com/v4/?api_key=A3cab820f8de4a0f03fb3ea65e50b62a0&method=sms&message="+message+"&to="+phone+"&sender=MCHICL&custom="+campaign
                }
                request(options, callback)
    }
    /*if ( message_type == "Welcome Message - (Do not consent 1)" ) {
        var message= "Welcome Aboard!!  Dear Policy holder: "+policy_number+", let us know a suitable time when you wish to go for the medical test. Give us a ring on 02249422122. Powered by Manipal Cigna"
        var campaign = "CIGNA-WELCOME-DNC-1"
        var options = {
                    url:"https://api-alerts.kaleyra.com/v4/?api_key=A3cab820f8de4a0f03fb3ea65e50b62a0&method=sms&message="+message+"&to="+phone+"&sender=Welthy&custom="+campaign
                }
                request(options, callback)
    }
    if ( message_type == "Welcome Message - (Do not consent 2)" ) {
        var message= "Greetings from the Proheal Program! We care for you. All necessary medical tests can be done in the safety of your home. Let us know if you have made up your mind. Give us a ring on 02249422122. Powered by Manipal Cigna."
        var campaign = "CIGNA-WELCOME-DNC-2"
        var options = {
                    url:"https://api-alerts.kaleyra.com/v4/?api_key=A3cab820f8de4a0f03fb3ea65e50b62a0&method=sms&message="+message+"&to="+phone+"&sender=Welthy&custom="+campaign
                }
                request(options, callback)
    }
    */
    if ( message_type == "Consent form" ) {
        var message= "Hey "+name+", thanks for confirming to be a part of Proheal Program. Kindly click on the https://bit.ly/2XYQmCd to give your consent to proceed for your medical tests.ManipalCigna"
        var campaign = "CIGNA-CONSENT"
        var options = {
                    url:"https://api-alerts.kaleyra.com/v4/?api_key=A3cab820f8de4a0f03fb3ea65e50b62a0&method=sms&message="+message+"&to="+phone+"&sender=MCHICL&custom="+campaign
                }
                request(options, callback)
    }
    if ( message_type == "Follow-up on email" ) {
        var message= "Did you see our email on the new Proheal program? To continue with these tips and more information on better managing your health, ring us at 02249422122. ManipalCigna"
        var campaign = "CIGNA-EMAIL-FOLLOWUP"
        var options = {
                    url:"https://api-alerts.kaleyra.com/v4/?api_key=A3cab820f8de4a0f03fb3ea65e50b62a0&method=sms&message="+message+"&to="+phone+"&sender=MCHICL&custom="+campaign
                }
                request(options, callback)
    }
    if ( message_type == "Telegram App download link" ) {
        var message= "Hey "+name+", Download the telegram app from http://onelink.to/w53azg and enjoy the free counselling from your personalized Health Coach of Proheal Program.ManipalCigna"
        var campaign = "CIGNA-TELEGRAM-LINK"
        var options = {
                    url:"https://api-alerts.kaleyra.com/v4/?api_key=A3cab820f8de4a0f03fb3ea65e50b62a0&method=sms&message="+message+"&to="+phone+"&sender=MCHICL&custom="+campaign
                }
                request(options, callback)
    }
    if ( message_type == "Telegram App download link 2" ) {
        var message= "Hey "+name+", Download the telegram app from http://onelink.to/w53azg and enjoy the free counselling from your personalized Health Coach of Proheal Program. Watch out the space for next 2 steps. ManipalCigna."
        var campaign = "CIGNA-TELEGRAM-LINK"
        var options = {
                    url:"https://api-alerts.kaleyra.com/v4/?api_key=A3cab820f8de4a0f03fb3ea65e50b62a0&method=sms&message="+message+"&to="+phone+"&sender=MCHICL&custom="+campaign
                }
                request(options, callback)
    }
    if ( message_type == "Feedback Form" ) {
        var message= "Hey there! Help us make the program better for you! Let us know about your experience here https://forms.gle/aniefA3sCcyxsSB78. ManipalCigna"
        var campaign = "CIGNA-ENROLLMENT"
        var options = {
                    url:"https://api-alerts.kaleyra.com/v4/?api_key=A3cab820f8de4a0f03fb3ea65e50b62a0&method=sms&message="+message+"&to="+phone+"&sender=MCHICL&custom="+campaign
                }
                request(options, callback)
    }
    /*if ( message_type == "Tip 1" ) {
        var message= "Did you know that a 5-min walk every 2 hours will add up to 20-30 mins/day? To know more about such lifestyle management hacks, click https://bit.ly/35Zpcj2."
        var campaign = "CIGNA-TIP1"
        var options = {
                    url:"https://api-alerts.kaleyra.com/v4/?api_key=A3cab820f8de4a0f03fb3ea65e50b62a0&method=sms&message="+message+"&to="+phone+"&sender=Welthy&custom="+campaign
                }
                request(options, callback)
    }
    if ( message_type == "Tip 2" ) {
        var message= "Manage your condition purely with a smart diet and regular exercise. Get started with your health management journey today! Click https://bit.ly/35Zpcj2."
        var campaign = "CIGNA-TIP2"
        var options = {
                    url:"https://api-alerts.kaleyra.com/v4/?api_key=A3cab820f8de4a0f03fb3ea65e50b62a0&method=sms&message="+message+"&to="+phone+"&sender=Welthy&custom="+campaign
                }
                request(options, callback)
    }
    if ( message_type == "Tip 3" ) {
        var message= "Tip of the day: A glass of methi dalchini water every day helps manage blood sugar. Get daily hacks to manage your health https://bit.ly/35Zpcj2!"
        var campaign = "CIGNA-TIP3"
        var options = {
                    url:"https://api-alerts.kaleyra.com/v4/?api_key=A3cab820f8de4a0f03fb3ea65e50b62a0&method=sms&message="+message+"&to="+phone+"&sender=Welthy&custom="+campaign
                }
                request(options, callback)
    }
    */
    if ( message_type == "Missed Call" ) {
        var message= "Seems like you missed our call. That's okay! Give us a call on 02249422122. ManipalCigna"
        var campaign = "CIGNA-MISSEDCALL"
        var options = {
                    url:"https://api-alerts.kaleyra.com/v4/?api_key=A3cab820f8de4a0f03fb3ea65e50b62a0&method=sms&message="+message+"&to="+phone+"&sender=MCHICL&custom="+campaign
                }
                request(options, callback)
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
 })

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})