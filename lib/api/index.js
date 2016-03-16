const utils = require('../utils/utils');
const messageService = require('../services/messageService');

exports.saveMessage = function(req, res) {
  return utils.promisifyResponse(res, messageService.saveMessage(req));
};

exports.getMessages = function(req, res) {
  return utils.promisifyResponse(res, messageService.getMessages(req));
};
