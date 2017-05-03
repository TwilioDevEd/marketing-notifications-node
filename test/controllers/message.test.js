const connectionHelper = require('../connectionHelper');
const expect = require('chai').expect;
const supertest = require('supertest');
const proxyquire = require('proxyquire');
const sinon = require('sinon');
const Subscriber = require('../../models/subscriber');

describe.only('messages', () => {
  const sendMessage = sinon.stub();
  const agent = getAgent(sendMessage);
  let subscriber = {};

  before(() => {
    return connectionHelper.connect();
  });

  beforeEach(() => {
    return Subscriber.remove({});
  });

  after(() => {
    return connectionHelper.disconnect();
  });

  describe('/message/send', () => {
    it('sends a message', () => {
      sendMessage.returns(Promise.resolve());
      return agent
        .post('/message/send')
        .send({message: 'Hey!', imageUrl: 'myimage'})
        .expect((response) => {
          expect(response.statusCode).to.be.equal(302);
          expect(response.header.location).to.be.equal('/');
          expect(sendMessage.calledOnce).to.be.true;
        });
    });
  });

  describe('/message', () => {
    it('it handles subscribe message for existing customer', () => {
      subscriber = new Subscriber({
        phone: 'phone',
        subscribed: false,
      });
      return subscriber.save().then(() => {
          return agent
            .post('/message')
            .type('form')
            .send('From=phone')
            .send('Body=subscribe')
            .then((response) => {
              expect(response.text).to.contain(
                'You are now subscribed for updates.');
              expect(response.header['content-type']).to.be.equal(
                'text/xml; charset=utf-8');
              expect(response.statusCode).to.be.equal(200);
              return Subscriber.findOne({phone: 'phone'});
            }).then((subscriber) => {
              expect(subscriber.subscribed).to.be.true;
            });
        });
    });

    it('it handles unsubscribe message for existing customer', () => {
      subscriber = new Subscriber({
        phone: 'phone',
        subscribed: true,
      });
      return subscriber.save().then(() => {
          return agent
            .post('/message')
            .type('form')
            .send('From=phone')
            .send('Body=unsubscribe')
            .then((response) => {
              expect(response.text).to.contain(
                'You have unsubscribed. Text &quot;subscribe&quot; to start ' +
                  'receiving updates again.');
              expect(response.header['content-type']).to.be.equal(
                'text/xml; charset=utf-8');
              expect(response.statusCode).to.be.equal(200);
              return Subscriber.findOne({phone: 'phone'});
            }).then((subscriber) => {
              expect(subscriber.subscribed).to.be.false;
            });
        });
    });

    it('it handles message for new customer', () => {
      return subscriber.save().then(() => {
          return agent
            .post('/message')
            .type('form')
            .send('From=phone')
            .then((response) => {
              expect(response.text).to.contain(
                'Thanks for contacting us! Text &quot;subscribe&quot; to ' +
                  'receive updates via text message.');
              expect(response.header['content-type']).to.be.equal(
                'text/xml; charset=utf-8');
              expect(response.statusCode).to.be.equal(200);
              return Subscriber.findOne({phone: 'phone'});
            }).then((subscriber) => {
              expect(subscriber.subscribed).to.be.false;
            });
        });
    });
  });
});

function getAgent(sendMessage) {
  const messageController = proxyquire('../../controllers/message', {
    '../lib/messageSender': {
      sendMessageToSubscribers: sendMessage,
    },
  });

  const router = proxyquire('../../controllers/router', {
    './message': messageController,
  });

  const webapp = proxyquire('../../webapp', {
    'controllers/router': router,
  });

  return supertest(webapp);
}
