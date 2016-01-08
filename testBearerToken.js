var prompt = require("prompt");
var Request = require("request");

prompt.start();

prompt.get(['twitterScreenName', 'bearerToken'], function (err, result) {
	if (err) { 
		return onErr(err); 
	} else {
		return testBearerToken(result.twitterScreenName, result.bearerToken);
	}
});

function onErr(err) {
	console.log(err);
	return 1;
}

function testBearerToken(screenName, bearerToken) {
	var url = 'https://api.twitter.com/1.1/statuses/user_timeline.json';

	Request({ url: url,
					method:'GET',
					qs:{"screen_name": screenName},
					json:true,
					headers: {
						"Authorization": "Bearer " + bearerToken
					}

	}, function(err, resp, body) {
		console.dir(body);
		return 0;
	});
}
