const router = require('express').Router(),
    passport = require('passport'),
    FacebookStrategy = require('passport-facebook').Strategy,
    authFacebook = require('../config/config').auths.facebook,
    bitcoinManager = require('../lib/bitcoinManager'),
    cookieManager = require('../lib/cookieManager');

passport.use(new FacebookStrategy({
    clientID: authFacebook.clientId,
    clientSecret: authFacebook.clientSecret,
    callbackURL: authFacebook.callbackUrl,
  },
  function(accessToken, refreshToken, profile, done) {
      return done(null, profile._json);
  }
));

router.get('/', passport.authenticate('facebook'));

router.get('/oauth',
  passport.authenticate('facebook', {failureRedirect: '/login' }), (req, res, next) => {
    const facebookId = req.user.id.toString();
    console.log(facebookId);

    cookieManager.setUserLoginInfo(res, facebookId);

    bitcoinManager.bitcoinClient.getAddressesByAccount(facebookId).then((responses)  => {
      if(responses.length == 0) {
        bitcoinManager.bitcoinClient.getNewAddress(facebookId).then((responses)  => {
          res.redirect("/main?id=" + facebookId);
        });
      } else {
        res.redirect("/main?id=" + facebookId);
      }
    });
  });

                                      
module.exports = router;