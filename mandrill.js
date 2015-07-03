var mandrill = require('mandrill-api/mandrill');
var mandrill_client = new mandrill.Mandrill('HwSNMGOM1BPbwp5gr0QSuw');
var fs = require("fs");
var async = require("async");


var headLinesString = '';
    

function buildHeadlinesString (headlinesArray, emailAddress){
    console.log('*** headLinestring START ,', headLinesString);
    console.log('*** headLinestring START 2 ,', headLinesString);

	console.log('*** headlinesArray:....', headlinesArray);
	async.forEachOf(headlinesArray, buildHeadline, function(err){
		if (err) console.error(err.message);
		// reset var
        headlinesArray.length = 0;
        console.log('*** headlines array is now ', headlinesArray);
            
              
        // console.log('reached sending stage');
            
		sendEmail(emailAddress);
	})		
}

function buildHeadline (object, key, callback){
	// console.log('building headline for..', object.headline);

	var string = '<tr><td class="headline"><a href="' + object.url + '" target="_blank" style="color:black;">'+ object.headline + '<span style="color:rgb(199, 216, 167);">   > </span></a><td></tr>'
	headLinesString += string; 
    console.log('***BUILDHEADLINE FUNCTION 1 headlines string is...', headLinesString);

    // headLinesString = 'test';
	// console.log('***BUILDHEADLINE FUNCTION 2 headlines string is...', headLinesString);
	callback();
}


function sendEmail (emailAddress) {
    var email1 = fs.readFileSync('views/email1.html').toString();
    var email2 = fs.readFileSync('views/email2.html').toString();
    	
    var emailCombined = email1 + headLinesString + email2;
    	
    var message = {
        "html": emailCombined,
        "text": "",
        "subject": "The week's top headlines from Lexoo",
        "from_email": "gaj.aubert@gmail.com",
        "from_name": "Lexoo",
        "to": [{
                "email": emailAddress,
                "name": "Lexoo",
                "type": "to"
            }],
        "headers": {
            "Reply-To": "gaj.aubert@gmail.com"
        },
        "important": null,
        "track_opens": null,
        "track_clicks": null,
        "auto_text": null,
        "auto_html": null,
        "inline_css": null,
        "url_strip_qs": null,
        "preserve_recipients": null,
        "view_content_link": null,
        "bcc_address": "",
        "tracking_domain": null,
        "signing_domain": null,
        "return_path_domain": null,
        "merge": true,
        "merge_language": "mailchimp",
        "global_merge_vars": [{
                "name": "merge1",
                "content": "merge1 content"
            }],
        "merge_vars": [{
                "rcpt": "recipient.email@example.com",
                "vars": [{
                        "name": "merge2",
                        "content": "merge2 content"
                    }]
            }],
        "tags": [
            "password-resets"
        ],
        // "subaccount": "customer-123",
        "google_analytics_domains": [
            "example.com"
        ],
        "google_analytics_campaign": "message.from_email@example.com",
        "metadata": {
            "website": "www.example.com"
        },
        "recipient_metadata": [{
                "rcpt": "recipient.email@example.com",
                "values": {
                    "user_id": 123456
                }
            }],
        //  "attachments": [{
        //          "type": "application/pdf",
        //          "name": "Keyword KING App Report.pdf",
        //          "content": base64str
        //      }],
        // "images": [{
        //         "type": "image/png",
        //         "name": "article1.png",
        //         "content": "3223F34F3CSDSDVSDV"
        //     }]
        };
    var async = false;
    var ip_pool = "Main Pool";
    var send_at = '';
    mandrill_client.messages.send({"message": message, "async": async, "ip_pool": ip_pool, "send_at": send_at}, function(result) {
        console.log('Email sent ----', result);
        // fs.unlink('reports/'+mongoid+".pdf", function (err) {
        //   if (err) throw err;
        //   console.log('successfully deleted report');
        // });
    }, function(e) {
        console.log('A mandrill error occurred: ' + e.name + ' - ' + e.message);
    });

    //reset var
        console.log('*** headLinesString before..', headLinesString);
        headLinesString = '';
        console.log('*** headLinesString after..', headLinesString);

}



module.exports = {
	buildHeadlinesString: buildHeadlinesString,
    sendEmail: sendEmail
}