
var db = require ('mongojs').connect('mongodb://lexoo:lexoo@ds036648.mongolab.com:36648/lexoo', ['contacts']);

function saveForm(object){
	console.log('MODEL saveForm triggered');
	db.contacts.save(object, function(err, saved){
		if( err || !saved ) console.log("Record not saved");
		else console.log("User saved");
	});
}

function getData(reply){
	// db.contacts.find({},function(error, data){
	// 	if( err || !data ) {
	// 		console.log("No data retrieved");
	// 	}
	// 	else {
	// 		reply(data);
	// 	}
	// });
	var data = db.contacts.find(function(err,data){
		console.log('data is....' , data);
		console.log('data 1 is )))))', data[0]);
		reply(data);
	});
}



module.exports = {
	saveForm: saveForm,
	getData: getData
}