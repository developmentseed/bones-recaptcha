var http = require('http');
var querystring = require('querystring');

servers.Core.augment({
    initialize: function(parent, app) {
        parent.call(this, app);
        templates.ReCaptcha.publicKey = Bones.plugin.config.recaptchaPublicKey;
    }
});

server = Bones.Server.extend();

server.verifyReCaptcha = function(req, res, next) {
    if (!req.body || !req.body.recaptcha_challenge_field || !req.body.recaptcha_response_field) {
        return next(new Error.HTTP('Captcha missing', 403));
    } else {
        // Yay, captcha validation!
        var data = querystring.stringify({
            privatekey: Bones.plugin.config.recaptchaPrivateKey,
            remoteip: (req.headers['x-forward-for'] || req.connection.remoteAddress).split(/\s*,\s*/)[0],
            challenge: req.body.recaptcha_challenge_field,
            response: req.body.recaptcha_response_field
        });

        var client = http.createClient(80, 'www.google.com');
        var request = client.request('POST', '/recaptcha/api/verify', {
            'host': 'www.google.com',
            'content-type': 'application/x-www-form-urlencoded',
            'content-length': data.length
        });
        request.write(data, 'utf8');
        request.end();
        request.on('response', function(res) {
            var body = '';
            res.on('data', function(chunk) { body += chunk; });
            res.on('end', function() {
                body = body.split('\n');
                if (body[0] === 'true') {
                    return next();
                }

                if (body[1] === 'incorrect-captcha-sol') {
                    return next(new Error.HTTP('Captcha incorrect', 409));
                } else if (body[1] === 'invalid-request-cookie') {
                    return next(new Error.HTTP('Captcha missing', 403));
                } else if (body[1] === 'invalid-site-private-key') {
                    console.warn('Invalid reCAPTCHA private key.');
                }

                return next(new Error.HTTP(500));
            });
        });
    }
};
