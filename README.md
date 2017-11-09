<a href="https://www.twilio.com">
  <img src="https://static0.twilio.com/marketing/bundles/marketing/img/logos/wordmark-red.svg" alt=Twilio width=250 />
</a>


# SMS Notifications for Node.js and Express

[![Build Status](https://travis-ci.org/TwilioDevEd/marketing-notifications-node.svg?branch=master)](https://travis-ci.org/TwilioDevEd/marketing-notifications-node)

This example project demonstrates how to send SMS notifications (for a mobile marketing campaign) using Node.js and Express.

[Read the full tutorial here](https://www.twilio.com/docs/tutorials/walkthrough/marketing-notifications/node/express)!


# Running the Project in production

## 1. Deploy your App

## 2. Configure your Twilio number

Go to your dashboard on [Twilio](https://www.twilio.com/console/phone-numbers/incoming). Click on Twilio Numbers and choose a number to setup.

On the phone number page, enter `https://<appname.com>/message` into the _Messaging_ Request URL field.

![Request URL](https://howtodocs.s3.amazonaws.com/setup-twilio-number.png)

## 3. Wrap Up!

Now your subscribers will be able to text your new Twilio number to 'Subscribe' to your Marketing Notifications line.

Congratulations!

# Running the Project on Your Machine

To run this project on your computer, download or clone the source. You will also need to download and install:
* [Node.js](https://nodejs.org) or [io.js](https://iojs.org/en/index.html)
* [npm](https://www.npmjs.com)

Finally you will also need to [sign up for a Twilio account](https://www.twilio.com/try-twilio) if you don't have one already.

## 1. Install Dependencies

Navigate to the project directory in your terminal

```bash
npm install
```

This should install all of our project dependencies from npm into a local `node_modules` folder.

## 2. Configuration

Next, open `config.js` at the root of the project and update it with values from your environment and your [Twilio account](https://www.twilio.com/console/voice/dashboard). You can either export these values as system environment variables (this is the default setup), or you can replace these values with hard-coded strings (be careful you don't commit them to git!).

This sample application stores data in a MongoDB database using [Mongoose](http://mongoosejs.com).

You can download and run MongoDB yourself
* [OS X](https://docs.mongodb.org/manual/tutorial/install-mongodb-on-os-x/)
* [Linux](https://docs.mongodb.org/manual/tutorial/install-mongodb-on-ubuntu/)
* [Windows](https://docs.mongodb.org/manual/tutorial/install-mongodb-on-windows/)
* You can also use a hosted service like [compose.io](https://www.compose.io/)

Our application will be looking for a fully qualified MongoDB connection string with a username and password embedded in it.

## 3. Running the Project

To launch the application, you can use `node .` in the project's root directory. You might also consider using [nodemon](https://github.com/remy/nodemon) for this. It works just like the node command, but automatically restarts your application when you change any source code files.

```bash
npm install -g nodemon \
nodemon .
```

## 4. Exposing Webhooks to Twilio

You will likely need to expose your local Node.js web application on the public Internet to work with Twilio. We recommend using [ngrok](https://ngrok.com/docs) to accomplish this. Use ngrok to expose a local port and get a publicly accessible URL you can use to accept incoming calls or texts to your Twilio numbers.

The following example would expose your local Node application running on port 3000 at `http://chunky-danger-monkey.ngrok.com` (reserved subdomains are a paid feature of ngrok):

```bash
ngrok -subdomain=chunky-danger-monkey 3000
```

## License

MIT

## Meta

* No warranty expressed or implied.  Software is as is. Diggity.
* [MIT License](http://www.opensource.org/licenses/mit-license.html)
* Lovingly crafted by Twilio Developer Education.
