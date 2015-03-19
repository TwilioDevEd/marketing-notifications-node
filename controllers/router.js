var home = require('./home');
var message = require('./message');

// Map routes to controller functions
module.exports = function(app) {
    // Twilio SMS webhook route
    app.post('/message', message.webhook);
};