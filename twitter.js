var Twitter = require('twitter');
var http = require('http');
var request = require('request');
 
var client = new Twitter({
  consumer_key: 'oBki8VkE6KxxgUuVhZhgqgYBc',
  consumer_secret: 'rNRyagetrcQLX0FCgyy21Br7abKh3RGgfSi2aYmIj27k8a5BaK',
  access_token_key: '1613170598-lGarGpI41n4e0jRGdh04BusqceTxzPPvc7Quysy',
  access_token_secret: 'POkTkYf9LArOvS51b9tBe4VR1RoFAP0XQiNkQtpfo3bet'
});


function test () {
    console.log('twitter test reached');
        
    client.get('https://api.twitter.com/1.1/search/tweets.json?q=ecommerce&result_type=popular&count=5', function(error, tweets, response){
        if(error) throw error;
        // console.log('TEST TWEETS ', tweets); 
        longUrl('http://t.co/XBn5fel0VD');
    })





    console.log('twitter test end');

}


function longUrl (shortUrl) {
    var apiString = "http://api.longurl.org/v2/expand?url=" + shortUrl + "&format=json";
    request(apiString, function (error, response, body) {
        if (!error && response.statusCode == 200) {
          console.log('REQUEST SAYS ---',body) 
        }
    })
}


module.exports = {
    test: test,
    longUrl: longUrl
}