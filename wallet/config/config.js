// DB 관련 설정 정보
exports.db = {
  local: {
    host: 'localhost',
    port: 5432,
    database: 'wallet',
    user: 'postgres',
    password: 'pgsql'
  },
  dev: {
    host: '',
    port: 5432,
    database: '',
    user: '',
    password: ''
  },
  real: {
    host: '',
    port: 5432,
    database: '',
    user: '',
    password: ''
  }
};

// 인증 관련 설정 정보
exports.auths = {
  kakao: {
    clientId: '',
    callbackUrl: ''
  }
};