var Twitter = require('twitter');
var http = require('http');
var request = require('request');
var async = require("async");

 
var client = new Twitter({
  consumer_key: 'oBki8VkE6KxxgUuVhZhgqgYBc',
  consumer_secret: 'rNRyagetrcQLX0FCgyy21Br7abKh3RGgfSi2aYmIj27k8a5BaK',
  access_token_key: '1613170598-lGarGpI41n4e0jRGdh04BusqceTxzPPvc7Quysy',
  access_token_secret: 'POkTkYf9LArOvS51b9tBe4VR1RoFAP0XQiNkQtpfo3bet'
});
var headlinesArray = [];

function getTweets (tag1, tag2, tag3) {
    console.log('twitter test reached');
    var tagArray = [tag1, tag2, tag3];
    for (var i=0; i<tagArray.length-2; i++){
        client.get('https://api.twitter.com/1.1/search/tweets.json?q='+tagArray[i]+'&result_type=popular&count=5', function(error, tweets, response){
            if(error) throw error;
            var obj = JSON.parse(response.body),
                tweetsArray = obj.statuses
            sortArray(tweetsArray);
        })

    }
                
    client.get('https://api.twitter.com/1.1/search/tweets.json?q=ecommerce&result_type=popular&count=5', function(error, tweets, response){
        if(error) throw error;
        // console.log('TEST TWEETS ', tweets); 
        longUrl('http://t.co/XBn5fel0VD');
    })





    console.log('twitter test end');

}


//HELPER FUNCTIONS

function sortArray (array) {
    array.sort(function(a,b){
        return b.retweet_count - a.retweet_count;
    }); 
    filterLanguage(array);
}

function filterLanguage (array) {
    var englishTweets = array.filter(testLanguage);
    topTwo(englishTweets);
        
}

function testLanguage (tweet) {  //filter test 
    return tweet.metadata.iso_language_code == "en"; 
}

function topTwo(englishTweets) {
    var textOnlyArray = [];
    for (var i=0; i<2; i++){
        textOnlyArray.push(englishTweets[i].text);
    }
    splitTextLinks(textOnlyArray);
}

function splitTextLinks(textOnlyArray) {
    var longHyperlinkComponent = [];
    for (var i=0; i<2; i++){
        var dividedText = textOnlyArray[i].split(' ');            
        var hyperlinkComponent = dividedText.filter(testHyperlink);
        console.log('hyperlinkComponent is ', hyperlinkComponent);
            
        var textComponent = dividedText.filter(testText);
        console.log('textComponent is ', textComponent);
        longUrl (hyperlinkComponent, textComponent, longHyperlinkComponent)
    }
}

function testHyperlink (word) {  //filter test
    return word.indexOf("http") == 0;
}

function testText (word) {  //filter test
    return word.indexOf("http");
}

function longUrl (hyperlinkComponent, textComponent, longHyperlinkComponent) {
    async.each(hyperlinkComponent, function(hyperlink){
        var apiString = "http://api.longurl.org/v2/expand?url=" + hyperlink + "&format=json";
        request(apiString, function (error, response, body) {
            if (!error && response.statusCode == 200) {
              console.log('REQUEST SAYS ---',body);
              var parsedLongUrl = JSON.parse(body)["long-url"];
              console.log('parsed long url is...', parsedLongUrl);
              longHyperlinkComponent.push(parsedLongUrl);
            }
        })
    }, removeTwitterUrls(longHyperlinkComponent));






    // for (var i=0; i<hyperlinkComponent.length; i++){
    //     var apiString = "http://api.longurl.org/v2/expand?url=" + hyperlinkComponent[i] + "&format=json";
    //     request(apiString, function (error, response, body) {
    //         if (!error && response.statusCode == 200) {
    //           console.log('REQUEST SAYS ---',body);
    //           var parsedLongUrl = JSON.parse(body)["long-url"];
    //           longHyperlinkComponent.push(parsedLongUrl);
    //         }
    //     })
    // }
    // callback(longHyperlinkComponent);
}

function removeTwitterUrls(longHyperlinkComponent) {
    console.log("longHyperlinkComponent is...", longHyperlinkComponent);
        
    var filteredHyperlinkComponent = longHyperlinkComponent.filter(testTwitterUrl);
    console.log('removeTwitterUrls is...', filteredHyperlinkComponent);
        
}

function testTwitterUrl (string) { // filter test
    return string.indexOf('twitter.com')<0;
}






// function buildHeadlineObject(hyperlinkComponent, textComponent){
//     var headlineObject = {};
//     headlineObject.text = textComponent.join(' ');
//     headlineObject.hyperlink = longUrl(hyperlinkComponent[0]);
//     console.log('headlineobject is...',headlineObject);
//     headlinesArray.push(headlineObject);
//     console.log('headlines array is...',headlinesArray);
// }



module.exports = {
    getTweets: getTweets,
    longUrl: longUrl
}