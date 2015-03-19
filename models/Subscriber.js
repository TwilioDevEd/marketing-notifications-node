var mongoose = require('mongoose');

var SubscriberSchema = new mongoose.Schema({
    phone: String,
    subscribed: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('Subscriber', SubscriberSchema);