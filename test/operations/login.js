
var POST = function(request, operation, params, callback) {
	
	var env = operation.env;
	var options = {
		json : true,
		body: params,
		method: 'POST',
		url : env.https + operation.session.settings.siteCode + Url(),
	};
	request(options, function(err, response, body) {
        if(err) { 
        	callback(true, {
        		ErrorCode : err,
				ErrorMessage : body,
			}); 
        	return; 
        } 
        var result = {
			"ErrorCode" : body.ErrorCode,
			"userid" : body.User.idUser,
			"accessToken" : body.User.AccessToken,
			"cartid" : body.CartInfo.CartId,
			"carttoken" : body.CartInfo.CartToken
		};		
        var check = operation.check(result);
        if (check) {
        	callback(true, check);
        	return;
        }
        operation.context.results[operation.name] = result;
        callback(false, result);
      });
};

var Url = function() {
	return '/myoox/login';
}

exports.POST = POST;
exports.Url = Url;
