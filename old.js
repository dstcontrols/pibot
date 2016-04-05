var restify = require('restify');
var builder = require('botbuilder');

var bot = new builder.BotConnectorBot();

bot.add('/', new builder.CommandDialog()
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

bot.add('/profile', [
  function (session) {
    if (session.userData.name) {
      builder.Prompts.text(session, 'What would you like me to call you instead?');
    } else {
      builder.Prompts.text(session, 'Hey there =). What\'s your name?');
    }
  },

  function (session, results) {
    session.userData.name = results.response;
    session.send('Got it, %s.', results.response);
    session.endDialog();
  },

]);

var port = process.env.PORT || 8080;
var server = restify.createServer();

server.use(bot.verifyBotFramework({ appId: 'testId', appSecret: 'testSecret' }));
server.post('/api/messages', bot.listen());
server.listen(port, function () {
  console.log('%s listening to %s', server.name, server.url);
});
