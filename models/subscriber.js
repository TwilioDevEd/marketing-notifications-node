const mongoose = require('mongoose');
const twilio = require('twilio');
const config = require('../config');

// create an authenticated Twilio REST API client
const client = twilio(config.accountSid, config.authToken);

const SubscriberSchema = new mongoose.Schema({
    phone: String,
    subscribed: {
        type: Boolean,
        default: false,
    },
});

// Static function to send a message to all current subscribers
SubscriberSchema.statics.sendMessage = function(message, url) {
    // Find all subscribed users
    return Subscriber.find({
        subscribed: true,
    }).then((docs) => {
        if (docs.length == 0) {
            return callback.call(this, {
                message: 'Could not find any subscribers!',
            });
        }
        // Send messages to all subscribers via Twilio
        return docs.map((subscriber) => {
            // Create options to send the message
            const options = {
                to: subscriber.phone,
                from: config.twilioNumber,
                body: message,
            };

            // Include media URL if one was given for MMS
            if (url) options.mediaUrl = url;

            // Send the message!
            return client.messages.create(options)
              .then((message) => {
                console.log(message);
                return Promise.resolve(message);
              })
              .catch((error) => {
                console.log(error);
                return Promise.reject(error);
              });
        }).reduce((all, currentPromise) => {
          Promise.all([all, currentPromise]);
        }, Promise.resolve());
    });
};

const Subscriber = mongoose.model('Subscriber', SubscriberSchema);
module.exports = Subscriber;
