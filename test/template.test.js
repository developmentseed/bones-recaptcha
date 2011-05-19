process.env.NODE_ENV = 'test';

var assert = require('assert');

require('./fixture');
var fixture = require('bones').plugin;
var server = new fixture.servers['Core'](fixture);

exports['test template'] = function() {
    assert.response(server, {
        url: '/captcha-test-page',
        method: 'GET'
    }, {
        body: '',
        status: 200
    });
};