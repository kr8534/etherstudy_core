const router = require('express').Router(),
  passport = require('passport'),
  KakaoStrategy = require('passport-kakao').Strategy,
  authKaKao = require('../config/config').auths.kakao,
  bitcoinManager = require('../lib/bitcoinManager');

passport.serializeUser((user, done) => {
  done(null, user);
});
  
passport.deserializeUser((user, done) => {
  done(null, user);
});
  

passport.use(new KakaoStrategy({
  clientID: authKaKao.clientId,
  clientSecret: authKaKao.clientSecret,
  callbackURL: authKaKao.callbackUrl
}, (accessToken, refreshToken, profile, done) => {
    return done(null, profile._json);
}));

// 카카오 로그인 요청
router.get('/', passport.authenticate('kakao'));

// 카카오 로그인 callback 처리 
router.get('/oauth', passport.authenticate('kakao', {
  failureRedirect: '/'
}), (req, res, next) => {
  const clientInfo = {
    kakaoId: req.user.id.toString(),
    email: req.user.kaccount_email,
    nickname: req.user.properties.nickname
  };

  console.log(clientInfo);
  bitcoinManager.bitcoinClient.getAddressesByAccount(req.user.id.toString()).then((responses)  => {
    if(responses.length == 0) {
      bitcoinManager.bitcoinClient.getNewAddress(req.user.id.toString()).then((responses)  => {
        res.render("index.html");
      });
    } else {
      res.render("index.html");
    }
  });
});

module.exports = router;