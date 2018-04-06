const logManager = require('../lib/logManager');
const cookieManager = require('../lib/cookieManager');
const userDao = require('../dao/userDao');

const logger = logManager(module, 'debug');

// 사용자 - 로그인 확인 요청
exports.isUser = (req, res, next) => {
  logger.info('사용자 - 로그인 확인 요청');

  const signInInfo = cookieManager.getUserLoginInfo(req);

  try {
    const isVerified = userDao.verifySignIn(signInInfo);

    if (isVerified) {
      return next();
    }
    return res.redirect('/');
  } catch (err) {
    logger.error('사용자 로그인 요청 처리 실패', err.stack);
    return res.redirect('/');
  }
}