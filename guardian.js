var request = require('request');
var async = require("async");
var mandrill = require('./mandrill.js');

var headlinesArray = [];

function getHeadlines(tagArray){

	async.forEachOf(tagArray, requestApi, function(err){
		if (err) console.error(err.message);
		console.log('async reached');
		mandrill.buildHeadlinesString(headlinesArray);


	})
}

function requestApi(tagArray, key, callback){
	// console.log('requestAPI called for...', tagArray);
	var baseUrl = "http://content.guardianapis.com/search?q=" + tagArray + "&api-key=jfrkfza276q5uz48kgwsrmp3";
    request(baseUrl, function (error, response, body) {
        if (!error && response.statusCode == 200) {
          var parsedResults = JSON.parse(body).response.results;
          createTwoHeadlines(parsedResults, headlinesArray, tagArray, callback);
        }
    })
}

function createTwoHeadlines(parsedResults, headlinesArray, tagArray, callback){
	// console.log('creating headlines for tag:...', tagArray);
	for(var i=0; i<2; i++){
		var headlineObject = new Object(); 
		headlineObject.headline = parsedResults[i].webTitle;
		headlineObject.url = parsedResults[i].webUrl;
		headlinesArray.push(headlineObject);
	}
	// console.log('****headlinesarray****', tagArray, '...', headlinesArray);
	callback();	
}



module.exports = {
	getHeadlines: getHeadlines  
}