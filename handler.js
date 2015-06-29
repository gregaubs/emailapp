var model = require('./model.js');
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

module.exports = {
	home: home,
	postForm: postForm,
	view: view,
	getData: getData
}

