var restify = require('restify');
var builder = require('botbuilder');

var port = process.env.PORT || 8080;

// Create bot and add dialogs
var piBot = new builder.BotConnectorBot();
piBot.add('/', new builder.CommandDialog()
  .matches('^set name', builder.DialogAction.beginDialog('/profile'))
  .matches('^quit', builder.DialogAction.endDialog())
  .onDefault(function (session) {
    if (!session.userData.name) {
      session.beginDialog('/profile');
    } else {
      session.send('Hello %s!', session.userData.name);
    }
  })
);

piBot.add('/profile', [
  function (session) {
    if (session.userData.name) {
      builder.Prompts.text(session, 'What would you like to change it to?');
    } else {
      builder.Prompts.text(session, 'Hi! What is your name?');
    }
  },

  function (session, results) {
    session.userData.name = results.response;
    session.endDialog();
  },

]);

// Setup Restify Server
var server = restify.createServer();
server.post('/v1/messages', bot.verifyBotFramework(), bot.listen());
server.listen(port, function () {
  console.log('%s listening to %s', server.name, server.url);
});
