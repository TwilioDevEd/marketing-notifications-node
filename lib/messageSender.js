const twilio = require('twilio');
const config = require('../config');

// create an authenticated Twilio REST API client
const client = twilio(config.accountSid, config.authToken);

const sendSingleTwilioMessage = function(subscriber, message, url) {
  // Create options to send the message
  const options = {
      to: subscriber.phone,
      from: config.twilioNumber,
      body: message,
  };

  // Include media URL if one was given for MMS
  if (url) options.mediaUrl = url;

  return new Promise((resolve, reject) => {
    // Send the message!
    client.messages.create(options)
      .then((message) => {
        console.log(message);
        resolve(message);
      })
      .catch((error) => {
        console.log(error);
        reject(error);
      });
  });
};

// Function to send a message to all current subscribers
  const sendMessageToSubscribers = function(subscribers, message, url) {
  // Find all subscribed users
  return new Promise((resolve, reject) => {
    if (subscribers.length == 0) {
      reject({message: 'Could not find any subscribers!'});
    } else {
      // Send messages to all subscribers via Twilio
      subscribers.map((subscriber) => {
        return sendSingleTwilioMessage(subscriber, message, url);
      }).reduce((all, currentPromise) => {
        return Promise.all([all, currentPromise]);
      }, Promise.resolve()).then(() => {
        resolve();
      });
    }
  });
};

module.exports.sendMessageToSubscribers = sendMessageToSubscribers;
