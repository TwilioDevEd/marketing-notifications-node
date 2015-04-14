# SMS Notifications for Node.js and Express

This example project demonstrates how to send SMS notifications (for a mobile marketing campaign) using Node.js and Express.

# Running the Project in production

## Step 1: Deploy to Heroku

Hit the button!

[![Deploy](https://www.herokucdn.com/deploy/button.png)](https://heroku.com/deploy?template=https://github.com/TwilioDevEd/marketing-notifications-node)

## Step 2: Configure your Twilio number

Go to your dashboard on [Twilio](https://www.twilio.com/user/account/phone-numbers/incoming). Click on Twilio Numbers and choose a number to setup.

On the phone number page, enter `https://<appname.herokuapp.com>/message` into the _Messaging_ Request URL field.

[![Request URL](http://howtodocs.s3.amazonaws.com/setup-twilio-number.png)]

## Step 3: Wrap Up!

Now your subscribers will be able to text your new Twilio number to 'Subscribe' to your Marketing Notifications line.

Congratulations!

# Running the Project on Your Machine

To run this project on your computer, download or clone the source. You will also need to download and install either [Node.js](http://nodejs.org/) or [io.js](https://iojs.org/en/index.html), both of which should also install [npm](https://www.npmjs.com/). You will also need to [sign up for a Twilio account](https://www.twilio.com/try-twilio) if you don't have one already.

## Step 1: Install Dependencies

Navigate to the project directory in your terminal and run:

```bash
npm install
```

This should install all of our project dependencies from npm into a local `node_modules` folder.

## Step 2: Configuration

Next, open `config.js` at the root of the project and update it with values from your environment and your [Twilio account](https://www.twilio.com/user/account/voice-messaging). You can either export these values as system environment variables (this is the default setup), or you can replace these values with hard-coded strings (be careful you don't commit them to git!).

This sample application stores data in a MongoDB database using [Mongoose](http://mongoosejs.com/). You can download and run MongoDB yourself ([OS X](http://docs.mongodb.org/manual/tutorial/install-mongodb-on-os-x/), [Linux](http://docs.mongodb.org/manual/tutorial/install-mongodb-on-ubuntu/), [Windows](http://docs.mongodb.org/manual/tutorial/install-mongodb-on-windows/)), or you can use a hosted service like [compose.io](https://www.compose.io/).  Our application will be looking for a fully qualified MongoDB connection string with a username and password embedded in it.

## Step 3: Running the Project

To launch the application, you can use `node .` in the project's root directory. You might also consider using [nodemon](https://github.com/remy/nodemon) for this. It works just like the node command, but automatically restarts your application when you change any source code files.

```bash
npm install -g nodemon
nodemon .
```

## Step 4: Exposing Webhooks to Twilio

You will likely need to expose your local Node.js web application on the public Internet to work with Twilio. We recommend using [ngrok](https://ngrok.com/docs) to accomplish this. Use ngrok to expose a local port and get a publicly accessible URL you can use to accept incoming calls or texts to your Twilio numbers.

The following example would expose your local Node application running on port 3000 at `http://chunky-danger-monkey.ngrok.com` (reserved subdomains are a paid feature of ngrok):

```bash
ngrok -subdomain=chunky-danger-monkey 3000
```

## License

MIT
