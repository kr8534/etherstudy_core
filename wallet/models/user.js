const dbManager = require('../lib/dbManager');

// 사용자 - 등록
exports.addUser = (params) => {
	const query = `
        INSERT INTO users (user_id, password)
        VALUES ($1, $2)`;
	const queryParams = [params.userId, params.password];

	return dbManager.executeQueryNone(query, queryParams);
}

// 사용자 - 조회 : sellerId와 password가 일치
exports.verifySignIn = (params) => {
  const query = `
          SELECT exists(SELECT 1
                        FROM users
                        WHERE user_id = $1 AND password = $2)`;
  const queryParams = [params.userId, params.password];

  return dbManager.executeQueryOne(query, queryParams);
}