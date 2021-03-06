var jwtSecret = 'your_jwt_secret'; //Same key used in JWTStrategy
var jwt = require('jsonwebtoken');
const passport = require('passport');
require('./passport'); //Local passport file. Doesn't need the extension?

function generateJWTToken(user) {
  return jwt.sign(user, jwtSecret, {
    subject: user.Username, //Username encoding in the JWT
    expiresIn: '7d', //Token will expire in 7 days
    algorithm: 'HS256' //Algorithm used to encode the values of the JWT
  });
}

//POST login
module.exports = (router) => {
  router.post('/login', (req, res) => {
    passport.authenticate('local', { session : false }, (error, user, info) => {
      if (error || !user) {
        return res.status(400).json({
          message: 'Something is not right',
          user: user
        });
      }
      req.login(user, { session : false }, (error) => {
        if (error) {
          res.send(error);
        }
        var token = generateJWTToken(user.toJSON());
        return res.json({ user, token });
      });
    })(req, res);
  });
}
