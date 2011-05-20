process.env.NODE_ENV = 'test';

var assert = require('assert');

require('./fixture');
var fixture = require('bones').plugin;
var server = new fixture.servers['Core'](fixture);

exports['test template'] = function() {
    assert.response(server, {
        url: '/',
        method: 'GET'
    }, { status: 200 }, function(res) {
        assert.ok(res.body.indexOf('<script type="text/javascript" src="//www.google.com/recaptcha/api/challenge?k="></script>') >= 0);
        assert.ok(res.body.indexOf('<textarea name="recaptcha_challenge_field" rows="3" cols="40"></textarea>') >= 0);
    });
};