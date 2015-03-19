var twilio = require('twilio');
var config = require('../config');

// Create an authenticated Twilio REST API client
var client = twilio(config.accountSid, config.authToken);

