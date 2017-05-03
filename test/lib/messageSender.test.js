const connectionHelper = require('../connectionHelper');
const expect = require('chai').expect;
const sinon = require('sinon');
const proxyquire = require('proxyquire');
const Subscriber = require('../../models/subscriber');

describe('subscriber', function() {
  const createStub = sinon.stub();
  const twilioClient = {
    messages: {create: createStub},
  };
  let messageSender = {};

  before(() => {
    return connectionHelper.connect().then(() => {
      messageSender = proxyquire('../../lib/messageSender', {
        'twilio': () => {
          return twilioClient;
        },
      });
    });
  });

  after(() => {
    return connectionHelper.disconnect();
  });

  it('sends a message to subscribers', function() {
    // given
    const subscribers = [
      new Subscriber({phone: 'phone1', subscribed: true}),
      new Subscriber({phone: 'phone2', subscribed: true})];

    createStub.returns(Promise.resolve('message'));

    // when
    return messageSender.sendMessageToSubscribers(subscribers, 'message', 'url')
      .then(() => {
        // then
        expect(createStub.calledTwice).to.be.true;
      });
  });
});
