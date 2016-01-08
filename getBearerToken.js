var prompt = require('prompt');
var Request = require("request");

prompt.start();

prompt.get(['key', 'secret'], function (err, result) {
	if (err) { 
		return onErr(err); 
	} else {
		return getBearerToken(result.key, result.secret);
	}
});

function onErr(err) {
	console.log(err);
	return 1;
}

function getBearerToken(key, secret) {
	var cat = key +":"+secret;
	var credentials = new Buffer(cat).toString('base64');

	var url = 'https://api.twitter.com/oauth2/token';

	Request({ url: url,
		method:'POST',
		headers: {
			"Authorization": "Basic " + credentials,
			"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"
		},
		body: "grant_type=client_credentials"

	}, function(err, resp, body) {
		console.log(body); //the bearer token...
		return 0;
	});
}
