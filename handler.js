var model = require('./model.js');
var twitterApi = require('./twitterapi.js');
var guardian = require('./guardian.js');

var emailAddress = '';

var home = function(request, reply){
    console.log('request handler for "/"');
    reply.file('views/index.html');
}

var view = function(request, reply){
    console.log('request handler for "/view"');
    reply.file('views/view.html');
}

var confirmation = function(request, reply){
    console.log('request handler for "/confirmation"');
    reply.file('views/confirmation.html');
}

var postForm = function (request, reply){
	console.log('request handler for "postForm"');
	console.log('payload: ', request.payload);
	model.saveForm(request.payload);
	reply('postForm received');
}

var getData = function(request, reply){
	console.log('request handler for "getData"');
	model.getData(reply);
}

var sendId = function (request, reply){
	console.log('request handler for "sendId"');
	console.log('ID of clicked button is...', request.query.id);
	model.getRecord(request.query.id, buildHeadlinesArray);		
}


//TWITTER FUNCTIONS
function twitterRequestHeadlines (record) {
	console.log('twitterRequestHeadlines, ', record);
	var tag1 = record[0].tag1,
		tag2 = record[0].tag2,
		tag3 = record[0].tag3
	twitterApi.getTweets(tag1, tag2, tag3);
		
		
}

//GUARDIAN FUNCTIONS
function buildHeadlinesArray (record) {
	console.log('guardian api called: ', record);
	var tag1 = record[0].tag1,
		tag2 = record[0].tag2,
		tag3 = record[0].tag3
		tagArray = [tag1, tag2, tag3]

	emailAddress = record[0].email;
	guardian.getHeadlines(tagArray, emailAddress);
}




module.exports = {
	home: home,
	postForm: postForm,
	view: view,
	confirmation: confirmation,
	getData: getData,
	sendId: sendId
}

