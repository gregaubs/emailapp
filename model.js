
var db = require ('mongojs').connect('mongodb://lexoo:lexoo@ds036648.mongolab.com:36648/lexoo', ['contacts']);
var oid = require("mongodb").ObjectID;

function saveForm(object){
	console.log('MODEL saveForm triggered');
	db.contacts.save(object, function(err, saved){
		if( err || !saved ) console.log("Record not saved");
		else console.log("User saved");
	});
}

function getData(reply){
	var data = db.contacts.find(function(err,data){
		reply(data);
	});
}

function getRecord(recordId, callback) {
	var record = db.contacts.find({_id: oid(recordId)}, function(err, record){
		callback(record);
	})

}


module.exports = {
	saveForm: saveForm,
	getData: getData,
	getRecord: getRecord
}