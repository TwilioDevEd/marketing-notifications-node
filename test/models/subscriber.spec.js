const connectionHelper = require('../connectionHelper');
const expect = require('chai').expect;
const sinon = require('sinon');
const proxyquire = require('proxyquire');

describe('subscriber', function() {
  const createStub = sinon.stub();
  let twilioClient = {
    messages: {create: createStub},
  };

  let Subscriber = proxyquire('../../models/subscriber', {
    'twilio': () => {
      return twilioClient;
    },
  });

  before((done) => {
    connectionHelper.connect();
    done();
  });

  after((done) => {
    connectionHelper.disconnect();
    done();
  });

  it('sends a message to all subscribers', function() {
    // given
    const subscribers = [
      new Subscriber({phone: 'phone1', subscribed: true}),
      new Subscriber({phone: 'phone2', subscribed: true}),
      new Subscriber({phone: 'phone3', subscribed: false})];

    createStub.returns(Promise.resolve('message'));

    const saveSubscribersPromise = subscribers
      .map((current) => {
        return current.save();
      })
      .reduce((all, currentPromise) => {
          return Promise.all([all, currentPromise]);
      }, Promise.resolve());

      return saveSubscribersPromise.then((a) => {
        // when
        return Subscriber.sendMessage('message', 'url')
          .then(() => {
            // then
            expect(createStub.calledTwice).to.be.true;
          });
      });
  });
});
