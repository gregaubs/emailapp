var model = require('./model.js');
var twitter = require('./twitter.js');
var jade = require('jade');
var path = __dirname + '/views/index.jade';
var fn = jade.compileFile(path);

var home = function(request, reply){
    console.log('request handler for "/"');
    reply.file('views/index.html');
}

var view = function(request, reply){
    console.log('request handler for "/view"');
    reply.file('views/view.html');
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
	model.getRecord(request.query.id, twitterRequestHeadlines);		
}


//TWITTER FUNCTIONS
function twitterRequestHeadlines (record) {
	console.log('twitterRequestHeadlines, ', record);
	var tag1 = record[0].tag1,
		tag2 = record[0].tag2,
		tag3 = record[0].tag3

	twitter.test();
		
		
}




module.exports = {
	home: home,
	postForm: postForm,
	view: view,
	getData: getData,
	sendId: sendId
}

