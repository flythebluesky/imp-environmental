
exports.dump = function (value) {
  console.log(JSON.stringify(value, null, 2));
};

exports.promisifyResponse = function(res, promise) {
  return promise
    .then(function (result) {
      return res.send(result);
    })
    .error(function (err) {
      return res.send(err);
    });
};
