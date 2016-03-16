var mongo = require('../utils/database');

exports.saveMessage = function(message) {
  return mongo.db().collection('messages').insertOneAsync(message);
};

exports.getMessages = function() {
  return mongo.db().collection('messages').find().sort({timestamp: 1}).limit(288).toArrayAsync();
};
