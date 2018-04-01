const logManager = require('../lib/logManager');
const userModel = require('../models/user');

const logger = logManager(module, 'debug');

// 사용자 - 등록
exports.addUser = (params) => {
  logger.debug('사용자 - 등록', 'params', params);

  userModel.addUser(params);
}

// 사용자 - 조회 : userId와 password가 일치
exports.verifySignIn = (params) => {
  logger.debug('사용자 - 조회 : userId와 password가 일치', 'params', params);

  const verified = userModel.verifySignIn(params);

  logger.debug('사용자 - 조회 완료', 'verified', verified);

  return verified.exists;
}