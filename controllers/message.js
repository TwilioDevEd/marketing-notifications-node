const Subscriber = require('../models/subscriber');
const messageSender = require('../lib/messageSender');

// Create a function to handle Twilio SMS / MMS webhook requests
exports.webhook = function(request, response) {
  // Get the user's phone number
  const phone = request.body.From;

  // Try to find a subscriber with the given phone number
  Subscriber.findOne({
    phone: phone,
  }, function(err, sub) {
    if (err) return respond('Derp! Please text back again later.');

    if (!sub) {
      // If there's no subscriber associated with this phone number,
      // create one
      const newSubscriber = new Subscriber({
          phone: phone,
      });

      newSubscriber.save(function(err, newSub) {
        if (err || !newSub)
          return respond('We couldn\'t sign you up - try again.');

        // We're signed up but not subscribed - prompt to subscribe
        respond('Thanks for contacting us! Text "subscribe" to ' +
           'receive updates via text message.');
      });
    } else {
      // For an existing user, process any input message they sent and
      // send back an appropriate message
      processMessage(sub);
    }
  });

  // Process any message the user sent to us
  function processMessage(subscriber) {
    // get the text message command sent by the user
    let msg = request.body.Body || '';
    msg = msg.toLowerCase().trim();

    // Conditional logic to do different things based on the command from
    // the user
    if (msg === 'subscribe' || msg === 'unsubscribe') {
      // If the user has elected to subscribe for messages, flip the bit
      // and indicate that they have done so.
      subscriber.subscribed = msg === 'subscribe';
      subscriber.save(function(err) {
        if (err)
          return respond('We could not subscribe you - please try '
              + 'again.');

        // Otherwise, our subscription has been updated
        let responseMessage = 'You are now subscribed for updates.';
        if (!subscriber.subscribed)
          responseMessage = 'You have unsubscribed. Text "subscribe"'
              + ' to start receiving updates again.';

        respond(responseMessage);
      });
    } else {
      // If we don't recognize the command, text back with the list of
      // available commands
      const responseMessage = 'Sorry, we didn\'t understand that. '
        + 'available commands are: subscribe or unsubscribe';

      respond(responseMessage);
    }
  }

  // Set Content-Type response header and render XML (TwiML) response in a
  // Jade template - sends a text message back to user
  function respond(message) {
    response.type('text/xml');
    response.render('twiml', {
        message: message,
    });
  }
};

// Handle form submission
exports.sendMessages = function(request, response) {
  // Get message info from form submission
  const message = request.body.message;
  const imageUrl = request.body.imageUrl;

  // Send messages to all subscribers
  Subscriber.find({
    subscribed: true,
  }).then((subscribers) => {
    messageSender.sendMessageToSubscribers(subscribers, message, imageUrl);
  }).then(() => {
    request.flash('successes', 'Messages on their way!');
    response.redirect('/');
  }).catch((err) => {
    console.log('err ' + err.message);
    request.flash('errors', err.message);
    response.redirect('/');
  });
};
