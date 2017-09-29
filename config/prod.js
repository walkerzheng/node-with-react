// prod.js - production keys here
module.exports = {
  googleClientID: process.env.GOOGLE_CLIENT_ID,
  googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
  mongoURL: process.env.MONGO_URI,
  cookieKey: process.env.COOKIE_KEY,
  callBackURL: 'https://blooming-wildwood-45085.herokuapp.com/auth/google/callback'
};