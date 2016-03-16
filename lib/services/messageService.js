var messageDao = require('../dao/messageDao');

exports.saveMessage = function(req) {
  var message = req.body;
  if (message.timestamp) message.timestamp = new Date(message.timestamp*1000);
  return messageDao.saveMessage(message);
};

exports.getMessages = function(req) {
  return messageDao.getMessages();
};

