var restify = require('restify');
var builder = require('botbuilder');

var server = restify.createServer();
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
  }));

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

server.use(piBot.verifyBotFramework({ appId: 'you id', appSecret: 'your secret' }));
server.post('/v1/messages',  piBot.listen());

server.listen(8080, function () {
  console.log('%s listening to %s', server.name, server.url);
  piBot.stdout('%s listening to %s', server.name, server.url);
});
