/*-----------------------------------------------------------------------------
A bot for managing a users to-do list.  See the README.md file for usage
instructions.
-----------------------------------------------------------------------------*/

var restify = require('restify');
var builder = require('botbuilder');
var index = require('./dialogs/index');

// Create bot and add dialogs
var bot = new builder.BotConnectorBot({
  appId: 'testId',
  appSecret: 'testSecret',
});

bot.add('/', index);

// Setup Restify Server
var server = restify.createServer();
server.post('/api/messages', bot.verifyBotFramework(), bot.listen());
server.listen(process.env.PORT || 8080, function () {
  console.log('%s listening at %s', server.name, server.url);
});
