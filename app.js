/*-----------------------------------------------------------------------------
A bot for managing a users to-do list.  See the README.md file for usage
instructions.
-----------------------------------------------------------------------------*/

var restify = require('restify');
var builder = require('botbuilder');
var dialogs = require('./dialogs.js')

// Create bot and add dialogs
var bot = new builder.BotConnectorBot({
    appId: 'testId',
    appSecret: 'testSecret'
});
bot.add('/', dialogs);

// Setup Restify Server
var server = restify.createServer();
server.post('/api/messages', bot.verifyBotFramework(), bot.listen());
server.listen(process.env.PORT || 8080, function () {
   console.log('%s listening to %s', server.name, server.url);
});
