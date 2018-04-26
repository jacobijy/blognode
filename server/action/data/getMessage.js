var getMessageList = require('../../data/getMessage');

exports.execute = function (req, res) {
  getMessageList.getMessageList( (data) => {
    res.send(data);
  });
};