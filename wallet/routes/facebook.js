const router = require('express').Router(),
    passport = require('passport'),
    FacebookStrategy = require('passport-facebook').Strategy,
    authFacebook = require('../config/config').auths.facebook,
    bitcoinManager = require('../lib/bitcoinManager');

passport.use(new FacebookStrategy({
    clientID: authFacebook.clientId,
    clientSecret: authFacebook.clientSecret,
    callbackURL: authFacebook.callbackUrl,
  },
  function(accessToken, refreshToken, profile, done) {
      console.log(profile._json);
  }
));

router.get('/', passport.authenticate('facebook'));

router.get('/oauth',
  passport.authenticate('facebook', { successRedirect: '/',
                                      failureRedirect: '/login' }));

module.exports = router;