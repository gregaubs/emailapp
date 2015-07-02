var Hapi = require('hapi');
var Joi = require('joi');
var server = new Hapi.Server();
var model = require('../model.js');
var shortid = require('shortid');
var handler = require('../handler.js');

/* $lab:coverage:off$ */
server.connection({
	host: "0.0.0.0",
	port: process.env.PORT || 8000
});
/* $lab:coverage:on$ */

    



// Static files
    server.route({
        method: 'GET',
        path: '/public/{param*}',
        handler: {
            directory: {
                path: 'public'
            }
        }
    });


//Homepage
    server.route({          
        method: 'GET',
        path: '/',
        handler: handler.home
    });


//View
    server.route({          
        method: 'GET',
        path: '/view',
        handler: handler.view
    });

//Get data
    server.route({          
        method: 'GET',
        path: '/getdata',
        handler: handler.getData
    });

   
//Form POST
    server.route({
        method: 'POST',
        path: '/postform',
        config: { 
            handler: handler.postForm,
            payload: {output: 'data', parse: true}
        }
    })

//Form POST
    server.route({
        method: 'GET',
        path: '/sendId',
        handler: handler.sendId
    })



//** RUNNING THE SERVER **//

server.start(function () {
    console.log('Server running at:', server.info.uri);
});



module.exports = server;
