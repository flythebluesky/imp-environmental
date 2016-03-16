var Promise = require('bluebird');
var MongoClient = Promise.promisifyAll(require('mongodb')).MongoClient;

var dbConnection;

exports.connect = function (url) {

  return new Promise(function (fulfill, reject) {
    // Already connected
    if (dbConnection) return fulfill(dbConnection);

    // Attempt to connect
    MongoClient.connect(url, {
        promiseLibrary: Promise,
      },
      function (err, database) {
        if (err) return reject(err);
        dbConnection = database;
        return fulfill(dbConnection);
      });
  });

};

exports.db = function () {
  return dbConnection;
};
