var Subscriber = require('../models/Subscriber');

// Create a function to handle Twilio SMS / MMS webhook requests
exports.webhook = function(request, response) {

    // Get the user's phone number
    var phone = request.body.From;

    // Try to find a subscriber with the given phone number
    Subscriber.findOne({
        phone: phone
    }, function(err, sub) {
        if (err) return respond('Derp! Please text back again later.');

        if (!sub) {
            // If there's no subscriber associated with this phone number,
            // create one
            var newSubscriber = new Subscriber({
                phone: phone
            });

            newSubscriber.save(function(err, newSub) {
                if (err || !newSub) 
                    return respond('We couldn\'t sign you up - try again.');

                // Otherwise, we're all signed up!
                respond('Thanks! You are signed up for updates.');
            });
        } else {
            // for now, just confirm that they're signed up
            return respond('you are all signed up!');
        }
    });

    // Set Content-Type response header and render XML (TwiML) response in a 
    // Jade template - sends a text message back to user
    function respond(message) {
        response.type('text/xml');
        response.render('twiml', {
            message: message
        });
    }
};