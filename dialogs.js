var builder = require('botbuilder');
var prompts = require('./prompts.js');

// Create LUIS Dialog that points at our model and add it as the root '/' dialog for our PI Bot.
var model = 'https://api.projectoxford.ai/luis/v1/application?id=dd7f913b-e392-40b5-826f-2b36a09112ff&subscription-key=3f4f7cbaaf70411cafef204258c658a1';
var dialog = new builder.LuisDialog(model);

dialog.on('EnergyUsage',
    builder.DialogAction.send('You used a lot.')
);

// // Export Command Dialog
// module.exports = new builder.CommandDialog()
//     .matches('^(hello|hi|howdy|help)', builder.DialogAction.send(prompts.helpMessage))
//     .matches('^(?:new|save|create|add)(?: (.+))?', saveTask)
//     .matches('^(?:done|delete|finish|remove)(?: (\\d+))?', finishTask)
//     .matches('^(list|show|tasks)', listTasks);

// function saveTask(session, args) {
//     if (args.matches) {
//         var task = args.matches[1];
//         if (task) {
//             if (!session.userData.tasks) {
//                 session.userData.tasks = [task];
//             }
//             else {
//                 session.userData.tasks.push(task);
//             }
//             session.send(prompts.saveTaskCreated, { index: session.userData.tasks.length, task: task });
//         }
//         else {
//             session.send(prompts.saveTaskMissing);
//         }
//     }
// }

// function finishTask(session, args) {
//     if (args.matches) {
//         var taskNumber = Number(args.matches[1]) - 1;
//         if (isNaN(taskNumber)) {
//             return session.send(prompts.finishTaskMissing);
//         }
//         if (!session.userData.tasks) {
//             session.userData.tasks = [];
//         }
//         if (session.userData.tasks.length <= taskNumber || taskNumber < 0) {
//             session.send(prompts.finishTaskInvalid, { index: taskNumber + 1 });
//         }
//         else {
//             session.userData.tasks = session.userData.tasks.slice(0, taskNumber).concat(session.userData.tasks.slice(taskNumber + 1));
//             session.send(prompts.finishTaskDone, { index: taskNumber + 1 });
//             listTasks(session, null);
//         }
//     }
//     else {
//         session.send(prompts.finishTaskMissing);
//     }
// }

// function listTasks(session, args) {
//     if (!session.userData.tasks) {
//         session.userData.tasks = [];
//     }
//     if (session.userData.tasks.length > 0) {
//         var list = '';
//         session.userData.tasks.forEach(function (value, index) {
//             list += session.gettext(prompts.listTaskItem, { index: index + 1, task: value });
//         });
//         session.send(prompts.listTaskList, list);
//     }
//     else {
//         session.send(prompts.listNoTasks);
//     }
// }
