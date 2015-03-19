var pages = require('./pages');
var message = require('./message');

// Map routes to controller functions
module.exports = function(app) {
    // Twilio SMS webhook route
    app.post('/message', message.webhook);

    // Render a page that will allow an administrator to send out a message
    // to all subscribers
    app.get('/', pages.showForm);

    // Handle form submission and send messages to subscribers
    app.post('/message/send', message.sendMessages);
};