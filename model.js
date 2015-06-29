
var db = require ('mongojs').connect('mongodb://lexoo:lexoo@ds036648.mongolab.com:36648/lexoo', ['contacts']);

function saveForm(object){
	console.log('MODEL saveForm triggered');
	db.contacts.save(object, function(err, saved){
	if( err || !saved ) console.log("Record not saved");
	else console.log("User saved");
});
}



module.exports = {
	saveForm: saveForm
}