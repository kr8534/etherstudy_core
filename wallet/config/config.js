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
    clientId: '5d8bf3f1d436b25efa2852e4d958db9b',
    clientSecret: 'm9vjqG0Lfm678smQOQddEsUzIcfAIvy0',
    callbackUrl: '/kakao/oauth'
  },
  facebook: {
    clientId: '182167109259940',
    clientSecret: '545a9402c5ab04468026ae0b6f04ce86',
    callbackUrl: '/facebook/oauth'
  }
};