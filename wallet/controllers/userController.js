const logManager = require('../lib/logManager');
const userModel = require('../dao/userDao');

const logger = logManager(module, 'debug');

// 사용자 - 등록
exports.addUser = (req, res, next) => {
  logger.debug('사용자 - 등록', 'params', params);

  userDao.addUser(params);

  res.send("ok");
}