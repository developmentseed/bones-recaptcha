#!/usr/bin/env node

require('../..');
require('bones').load(__dirname);

if (!module.parent) {
    require('bones').start();
}
