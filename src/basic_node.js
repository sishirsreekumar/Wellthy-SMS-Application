var express = require('express');
var request = require('request');
//const performance = require('perf_hooks').performance;

var app =express()
//var t0 = performance.now()
// Process.env.port stores the port Heroku uses to listen 3000 is the default port
const port = process.env.PORT || 3000
//console.log("Time t0:" + t0)

// Parse JSON bodies (as sent by API clients)
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/",(req,res)=>{
    console.log("Logged to site")
    res.send("<h1>Webhook Server</h1>")
})

app.post("/leads",(req,res)=>{
    //res.send("Hello there")
    //console.log(req.body)
    //console.log("new body data",req.body.contact_mobile_number)
    //if(typeof req.body["contact_cf_patients_mobile_number__cigna"] == 'undefined'){
    var phone=req.body["lead_cf_patients_mobile_number__cigna"]
    var name = req.body["lead_first_name"]
    var therapy = req.body["lead_cf_therapy"]
    //var n = req.body["lead_cf_number_of_times_called"]
    //var rnr = req.body["lead_cf_number_of_times_rnr"]
    //var number_of_times_called = req.body["lead_cf_number_of_times_called"]
    //var cb = req.body["lead_cf_number_of_time_call_back"]
    //var int_nc = req.body["lead_cf_number_of_time_interested_no_consent"]
    //var call_status = req.body["lead_cf_onboarding_remarks"]
    //dummy comment
    //var client= req.body["lead_cf_client"]
    //var campaign = req.body["lead_cf_campaign"]
    var policy_number = req.body["lead_cf_policy_number"]
    var message_type = req.body["lead_cf_cigna_message_type"]
    /*} else {
        var phone=req.body["contact_cf_patients_mobile_number__cigna"]
        var name = req.body["contact_first_name"]
        var policy_number = req.body["contact_cf_policy_number"]
        var message_type = req.body["contact_cf_cigna_message_type"]
    }*/
    
    //var t1 = performance.now()
    //console.log("Time t0:" + t1)
    //console.log("Call to doSomething took " + (t1 - t0) + " milliseconds.")
    //var poilcy_name = req.body["lead_cf_campaign"]
    //console.log("Campaign: ", campaign)
    if ( message_type == "Enrollment steps" ) {
        var message= "2 simple steps to enroll in Manipal Cigna Proheal program. 1. Click on the https://t.me/Prohealbot 2. Send us a \'Hi\' with your name and phone number.ManipalCigna"
        var campaign = "CIGNA-ENROLLMENT"
        var options = {
                    url:"https://api-alerts.kaleyra.com/v4/?api_key=A3cab820f8de4a0f03fb3ea65e50b62a0&method=sms&message="+message+"&to="+phone+"&sender=MCHICL&custom="+campaign
                }
                request(options, callback);
    }
    else if ( message_type == "Welcome Message - General" ) {
        var message = "Dear Policy holder: "+policy_number+", Let\'s begin the journey towards a healthier YOU. Please tap https://bit.ly/35Zpcj2 to know about the Proheal Program! By ManipalCigna."
        //var message = "Dear Policy holder: "+policy_number+", Let’s begin the journey towards a healthier YOU. Please tap https://bit.ly/3mzLY6N to know about the Proheal Program! By Manipal Cigna."
        var campaign = "CIGNA-WELCOME"
        var options = {
            url:"https://api-alerts.kaleyra.com/v4/?api_key=A3cab820f8de4a0f03fb3ea65e50b62a0&method=sms&message="+message+"&to="+phone+"&sender=MCHICL&custom="+campaign
                }
                request(options, callback);
    }
    else if ( message_type == "Welcome Message - (Do not consent 1)" ) {
        var message= "Welcome Aboard. Dear Policyholder "+policy_number+", Let us know what time is most convenient for you to book a medical test. We're just a call away ! 02249422122. Powered by Manipal Cigna"
        var campaign = "CIGNA-WELCOME-DNC-1"
        var options = {
                    url:"https://api-alerts.kaleyra.com/v4/?api_key=A3cab820f8de4a0f03fb3ea65e50b62a0&method=sms&message="+message+"&to="+phone+"&sender=MCHICL&custom="+campaign
                }
                request(options, callback);
    }
    else if ( message_type == "Welcome Message - (Do not consent 2)" ) {
        var message= "Greetings, from the ProHeal Program team! Your health and safety is our utmost priority, hence we're offering at home medical tests for you. Let us know how we can help, we're just one call away ! 02249422122. Powered by Manipal Cigna."
        var campaign = "CIGNA-WELCOME-DNC-2"
        var options = {
                    url:"https://api-alerts.kaleyra.com/v4/?api_key=A3cab820f8de4a0f03fb3ea65e50b62a0&method=sms&message="+message+"&to="+phone+"&sender=MCHICL&custom="+campaign
                }
                request(options, callback);
    }
    
    else if ( message_type == "Consent form" ) {
        var message= "Hey "+name+", thanks for confirming to be a part of Proheal Program. Kindly click on the https://bit.ly/2XYQmCd to give your consent to proceed for your medical tests.ManipalCigna"
        var campaign = "CIGNA-CONSENT"
        var options = {
                    url:"https://api-alerts.kaleyra.com/v4/?api_key=A3cab820f8de4a0f03fb3ea65e50b62a0&method=sms&message="+message+"&to="+phone+"&sender=MCHICL&custom="+campaign
                }
                request(options, callback);
    }
    else if ( message_type == "Follow-up on email" ) {
        var message= "Did you see our email on the new Proheal program? To continue with these tips and more information on better managing your health, ring us at 02249422122. ManipalCigna"
        var campaign = "CIGNA-EMAIL-FOLLOWUP"
        var options = {
                    url:"https://api-alerts.kaleyra.com/v4/?api_key=A3cab820f8de4a0f03fb3ea65e50b62a0&method=sms&message="+message+"&to="+phone+"&sender=MCHICL&custom="+campaign
                }
                request(options, callback);
    }
    else if ( message_type == "Telegram App download link" ) {
        var message= "Hey "+name+", Download the telegram app from http://onelink.to/w53azg and enjoy the free counselling from your personalized Health Coach of Proheal Program.ManipalCigna"
        var campaign = "CIGNA-TELEGRAM-LINK"
        var options = {
                    url:"https://api-alerts.kaleyra.com/v4/?api_key=A3cab820f8de4a0f03fb3ea65e50b62a0&method=sms&message="+message+"&to="+phone+"&sender=MCHICL&custom="+campaign
                }
                request(options, callback);
    }
    else if ( message_type == "Telegram App download link 2" ) {
        var message= "Hey "+name+", Download the telegram app from http://onelink.to/w53azg and enjoy the free counselling from your personalized Health Coach of Proheal Program. Watch out the space for next 2 steps. ManipalCigna."
        var campaign = "CIGNA-TELEGRAM-LINK"
        var options = {
                    url:"https://api-alerts.kaleyra.com/v4/?api_key=A3cab820f8de4a0f03fb3ea65e50b62a0&method=sms&message="+message+"&to="+phone+"&sender=MCHICL&custom="+campaign
                }
                request(options, callback);
    }
    else if ( message_type == "Feedback Form" ) {
        var message= "Hey there! Help us make the program better for you! Let us know about your experience here https://forms.gle/aniefA3sCcyxsSB78. ManipalCigna"
        var campaign = "CIGNA-FEEDBACK"
        var options = {
                    url:"https://api-alerts.kaleyra.com/v4/?api_key=A3cab820f8de4a0f03fb3ea65e50b62a0&method=sms&message="+message+"&to="+phone+"&sender=MCHICL&custom="+campaign
                }
                request(options, callback);
    }
    
    else if ( message_type == "Tip 1" ) {
        var message= "Did you know that 5 mins of walking every 2 hours will add up to 20-30 mins / day ? To learn more such lifestyle management hacks, click https://bit.ly/35Zpcj2. ManipalCigna."
        var campaign = "CIGNA-TIP1"
        var options = {
                    url:"https://api-alerts.kaleyra.com/v4/?api_key=A3cab820f8de4a0f03fb3ea65e50b62a0&method=sms&message="+message+"&to="+phone+"&sender=MCHICL&custom="+campaign
                }
                request(options, callback);
    }
    else if ( message_type == "Tip 2" ) {
        var message= "Take control of your health, with well-balanced diet and regular exercise. Get started with your health management journey today ! Click https://bit.ly/35Zpcj2. ManipalCigna."
        var campaign = "CIGNA-TIP2"
        var options = {
                    url:"https://api-alerts.kaleyra.com/v4/?api_key=A3cab820f8de4a0f03fb3ea65e50b62a0&method=sms&message="+message+"&to="+phone+"&sender=MCHICL&custom="+campaign
                }
                request(options, callback);
    }
    else if ( message_type == "Tip 3" ) {
        var message= "TIP of the day: Drinking a glass of Methi seeds and Dalchini water every day can help control blood sugar. Get daily hacks to stay healthy Click https://bit.ly/35Zpcj2! ManipalCigna."
        var campaign = "CIGNA-TIP3"
        var options = {
                    url:"https://api-alerts.kaleyra.com/v4/?api_key=A3cab820f8de4a0f03fb3ea65e50b62a0&method=sms&message="+message+"&to="+phone+"&sender=MCHICL&custom="+campaign
                }
                request(options, callback);
    }
    else if ( message_type == "Program details" ) {
        var message= "Want to learn more about the ProHeal Program ? Click https://bit.ly/35Zpcj2!. ManipalCigna."
        var campaign = "CIGNA-PD"
        var options = {
                    url:"https://api-alerts.kaleyra.com/v4/?api_key=A3cab820f8de4a0f03fb3ea65e50b62a0&method=sms&message="+message+"&to="+phone+"&sender=MCHICL&custom="+campaign
                }
                request(options, callback);
    }
    
    else if ( message_type == "Missed Call" ) {
        var message= "Seems like you missed our call. That's okay! Give us a call on 02249422122. ManipalCigna"
        var campaign = "CIGNA-MISSEDCALL"
        var options = {
                    url:"https://api-alerts.kaleyra.com/v4/?api_key=A3cab820f8de4a0f03fb3ea65e50b62a0&method=sms&message="+message+"&to="+phone+"&sender=MCHICL&custom="+campaign
                }
                request(options, callback);
    }
    /*else if ( message_type == "Wellthy App download link - MCHI" ) {
        switch (therapy) {
            case "Type 2 Diabetes":
              var link = "https://wellthy.page.link/949T";
              break;
            case "Asthma":
                var link = "https://wellthy.page.link/3X6i";
              break;
            case "Hypertension":
                var link = "https://wellthy.page.link/JTXY";
                break;
            case "Dyslipidemia":
                var link = "https://wellthy.page.link/AZpF";
                break;
            case "Obesity":
                var link = "https://wellthy.page.link/tecp";
                break;
            case "Wellness":
                var link = "https://wellthy.page.link/68C5";
                break;
            default:
                var link = "https://wellthy.page.link/68C5";
        }
        var message = "Dear Customer, ManipalCigna is glad to have you onboard! To avail sponsored Wellness benefit in your policy: "+policy_number+", click on the link "+link
        var campaign = "CIGNA-MCHI-APP-DOWNLOAD"
        var options = {
            url:"https://api-alerts.kaleyra.com/v4/?api_key=A3cab820f8de4a0f03fb3ea65e50b62a0&method=sms&message="+message+"&to="+phone+"&sender=MCHICL&custom="+campaign
                }
                request(options, callback);
    } */
    res.status(200).end()
    //console.log("TO Remarks: ",req.body.lead_cf_onboarding_remarks)
    //console.log("RNR Number: ",req.body.lead_cf_number_of_times_rnr)
    //console.log("CallBack Number ",req.body.lead_cf_number_of_time_call_back)
    //console.log("Campaign: ", campaign)
    function callback(error, response, body) {

        if(error){
            console.log("ERRROR ",error)
            res.send("ERROR")
        }
        else if (!error && response.statusCode == 200) {
            console.log(body);
            //var t2 = performance.now()
            //console.log("Call to doSomething took " + (t2 - t0) + " milliseconds.")
            res.status(200).end()
        }
    }
 })


 app.post("/contacts",(req,res)=>{
    //res.send("Hello there")
    //console.log(req.body)
    //console.log("new body data",req.body.contact_mobile_number)
    /*if(typeof req.body["contact_cf_patients_mobile_number__cigna"] == 'undefined'){
        var phone=req.body["lead_cf_patients_mobile_number__cigna"]
        var name = req.body["lead_first_name"]
    //var n = req.body["lead_cf_number_of_times_called"]
    //var rnr = req.body["lead_cf_number_of_times_rnr"]
    //var number_of_times_called = req.body["lead_cf_number_of_times_called"]
    //var cb = req.body["lead_cf_number_of_time_call_back"]
    //var int_nc = req.body["lead_cf_number_of_time_interested_no_consent"]
    //var call_status = req.body["lead_cf_onboarding_remarks"]
    //dummy comment
    //var client= req.body["lead_cf_client"]
    //var campaign = req.body["lead_cf_campaign"]
        var policy_number = req.body["lead_cf_policy_number"]
        var message_type = req.body["lead_cf_cigna_message_type"]
    } else {*/
        var phone=req.body["contact_cf_patients_mobile_number__cigna"]
        var name = req.body["contact_first_name"]
        var policy_number = req.body["contact_cf_policy_number"]
        var message_type = req.body["contact_cf_cigna_message_type"]
    //}
    //var t1 = performance.now()
    //console.log("Call to doSomething contacts took " + (t1 - t0) + " milliseconds.")
    //var poilcy_name = req.body["lead_cf_campaign"]
    //console.log("Campaign: ", campaign)
    if ( message_type == "Enrollment steps" ) {
        var message= "2 simple steps to enroll in Manipal Cigna Proheal program. 1. Click on the https://t.me/Prohealbot 2. Send us a \'Hi\' with your name and phone number.ManipalCigna"
        var campaign = "CIGNA-ENROLLMENT"
        var options = {
                    url:"https://api-alerts.kaleyra.com/v4/?api_key=A3cab820f8de4a0f03fb3ea65e50b62a0&method=sms&message="+message+"&to="+phone+"&sender=MCHICL&custom="+campaign
                }
                request(options, callback);
    }
    /*else if ( message_type == "Welcome Message - General" ) {
        var message = "Dear Policy holder: "+policy_number+", Let\'s begin the journey towards a healthier YOU. Please tap https://bit.ly/35Zpcj2 to know about the Proheal Program! By ManipalCigna."
        //var message = "Dear Policy holder: "+policy_number+", Let’s begin the journey towards a healthier YOU. Please tap https://bit.ly/3mzLY6N to know about the Proheal Program! By Manipal Cigna."
        var campaign = "CIGNA-WELCOME"
        var options = {
            url:"https://api-alerts.kaleyra.com/v4/?api_key=A3cab820f8de4a0f03fb3ea65e50b62a0&method=sms&message="+message+"&to="+phone+"&sender=MCHICL&custom="+campaign
                }
                request(options, callback);
    }
    else if ( message_type == "Welcome Message - (Do not consent 1)" ) {
        var message= "Welcome Aboard. Dear Policyholder "+policy_number+", Let us know what time is most convenient for you to book a medical test. We're just a call away ! 02249422122. Powered by Manipal Cigna"
        var campaign = "CIGNA-WELCOME-DNC-1"
        var options = {
                    url:"https://api-alerts.kaleyra.com/v4/?api_key=A3cab820f8de4a0f03fb3ea65e50b62a0&method=sms&message="+message+"&to="+phone+"&sender=MCHICL&custom="+campaign
                }
                request(options, callback);
    }
    else if ( message_type == "Welcome Message - (Do not consent 2)" ) {
        var message= "Greetings, from the ProHeal Program team! Your health and safety is our utmost priority, hence we're offering at home medical tests for you. Let us know how we can help, we're just one call away ! 02249422122. Powered by Manipal Cigna."
        var campaign = "CIGNA-WELCOME-DNC-2"
        var options = {
                    url:"https://api-alerts.kaleyra.com/v4/?api_key=A3cab820f8de4a0f03fb3ea65e50b62a0&method=sms&message="+message+"&to="+phone+"&sender=MCHICL&custom="+campaign
                }
                request(options, callback);
    }
    
    else if ( message_type == "Consent form" ) {
        var message= "Hey "+name+", thanks for confirming to be a part of Proheal Program. Kindly click on the https://bit.ly/2XYQmCd to give your consent to proceed for your medical tests.ManipalCigna"
        var campaign = "CIGNA-CONSENT"
        var options = {
                    url:"https://api-alerts.kaleyra.com/v4/?api_key=A3cab820f8de4a0f03fb3ea65e50b62a0&method=sms&message="+message+"&to="+phone+"&sender=MCHICL&custom="+campaign
                }
                request(options, callback);
    }
    else if ( message_type == "Follow-up on email" ) {
        var message= "Did you see our email on the new Proheal program? To continue with these tips and more information on better managing your health, ring us at 02249422122. ManipalCigna"
        var campaign = "CIGNA-EMAIL-FOLLOWUP"
        var options = {
                    url:"https://api-alerts.kaleyra.com/v4/?api_key=A3cab820f8de4a0f03fb3ea65e50b62a0&method=sms&message="+message+"&to="+phone+"&sender=MCHICL&custom="+campaign
                }
                request(options, callback);
    }*/
    else if ( message_type == "Telegram App download link" ) {
        var message= "Hey "+name+", Download the telegram app from http://onelink.to/w53azg and enjoy the free counselling from your personalized Health Coach of Proheal Program.ManipalCigna"
        var campaign = "CIGNA-TELEGRAM-LINK"
        var options = {
                    url:"https://api-alerts.kaleyra.com/v4/?api_key=A3cab820f8de4a0f03fb3ea65e50b62a0&method=sms&message="+message+"&to="+phone+"&sender=MCHICL&custom="+campaign
                }
                request(options, callback);
    }
    else if ( message_type == "Telegram App download link 2" ) {
        var message= "Hey "+name+", Download the telegram app from http://onelink.to/w53azg and enjoy the free counselling from your personalized Health Coach of Proheal Program. Watch out the space for next 2 steps. ManipalCigna."
        var campaign = "CIGNA-TELEGRAM-LINK"
        var options = {
                    url:"https://api-alerts.kaleyra.com/v4/?api_key=A3cab820f8de4a0f03fb3ea65e50b62a0&method=sms&message="+message+"&to="+phone+"&sender=MCHICL&custom="+campaign
                }
                request(options, callback);
    }
    else if ( message_type == "Feedback Form" ) {
        var message= "Feedbacks help us improve. We at Wellthy would like to know your response to the Proheal program. Click on the link and submit your feedback https://forms.gle/Jq13XeaiRMBqBYMF6"
        var campaign = "CIGNA-FEEDBACK"
        var options = {
                    url:"https://api-alerts.kaleyra.com/v4/?api_key=A3cab820f8de4a0f03fb3ea65e50b62a0&method=sms&message="+message+"&to="+phone+"&sender=WELTHY&custom="+campaign
                }
                request(options, callback);
    }

    else if ( message_type == "2nd Lab Test" ) {
        var message= "Congratulations ! Time for your 2nd medical test as part of the Manipal Cigna Pro heal program ! Connect with your health coach on telegram or give us a missed call on +912249422122 to book the test."
        var campaign = "CIGNA-LABTEST-2"
        var options = {
                    url:"https://api-alerts.kaleyra.com/v4/?api_key=A3cab820f8de4a0f03fb3ea65e50b62a0&method=sms&message="+message+"&to="+phone+"&sender=WELTHY&custom="+campaign
                }
                request(options, callback);
    }
    /*
    else if ( message_type == "Tip 1" ) {
        var message= "Did you know that 5 mins of walking every 2 hours will add up to 20-30 mins / day ? To learn more such lifestyle management hacks, click https://bit.ly/35Zpcj2. ManipalCigna."
        var campaign = "CIGNA-TIP1"
        var options = {
                    url:"https://api-alerts.kaleyra.com/v4/?api_key=A3cab820f8de4a0f03fb3ea65e50b62a0&method=sms&message="+message+"&to="+phone+"&sender=MCHICL&custom="+campaign
                }
                request(options, callback);
    }
    else if ( message_type == "Tip 2" ) {
        var message= "Take control of your health, with well-balanced diet and regular exercise. Get started with your health management journey today ! Click https://bit.ly/35Zpcj2. ManipalCigna."
        var campaign = "CIGNA-TIP2"
        var options = {
                    url:"https://api-alerts.kaleyra.com/v4/?api_key=A3cab820f8de4a0f03fb3ea65e50b62a0&method=sms&message="+message+"&to="+phone+"&sender=MCHICL&custom="+campaign
                }
                request(options, callback);
    }
    else if ( message_type == "Tip 3" ) {
        var message= "Want to learn more about the ProHeal Program ? Click https://bit.ly/35Zpcj2!. ManipalCigna."
        var campaign = "CIGNA-TIP3"
        var options = {
                    url:"https://api-alerts.kaleyra.com/v4/?api_key=A3cab820f8de4a0f03fb3ea65e50b62a0&method=sms&message="+message+"&to="+phone+"&sender=MCHICL&custom="+campaign
                }
                request(options, callback);
    }
    
    else if ( message_type == "Missed Call" ) {
        var message= "Seems like you missed our call. That's okay! Give us a call on 02249422122. ManipalCigna"
        var campaign = "CIGNA-MISSEDCALL"
        var options = {
                    url:"https://api-alerts.kaleyra.com/v4/?api_key=A3cab820f8de4a0f03fb3ea65e50b62a0&method=sms&message="+message+"&to="+phone+"&sender=MCHICL&custom="+campaign
                }
                request(options, callback);
    }*/
    //console.log("TO Remarks: ",req.body.lead_cf_onboarding_remarks)
    //console.log("RNR Number: ",req.body.lead_cf_number_of_times_rnr)
    //console.log("CallBack Number ",req.body.lead_cf_number_of_time_call_back)
    //console.log("Campaign: ", campaign)
    res.status(200).end()
    function callback(error, response, body) {

        if(error){
            console.log("ERRROR ",error)
            res.send("ERROR")
        }
        else if (!error && response.statusCode == 200) {
            console.log(body);
            //var t2 = performance.now()
            //console.log("Call to doSomething took " + (t2 - t0) + " milliseconds.")
            res.status(200).end()
        }
    }
 })







app.listen(port, () => {
    console.log('Server is up on port ' + port)
})