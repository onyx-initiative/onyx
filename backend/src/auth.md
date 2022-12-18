# ChatGPT OAuth Implementation

```
npm install passport passport-oauth2
```

-- This would be in the handler so I can add the express routes
```ts
const express = require('express');
const passport = require('passport');
const OAuth2Strategy = require('passport-oauth2').Strategy;

passport.use(new OAuth2Strategy({
  authorizationURL: 'https://your-oauth-provider.com/authorize',
  tokenURL: 'https://your-oauth-provider.com/token',
  clientID: 'YOUR_CLIENT_ID',
  clientSecret: 'YOUR_CLIENT_SECRET',
  callbackURL: 'http://your-callback-url.com/callback'
},
function(accessToken, refreshToken, profile, cb) {
  // Here, you can store the user's access token and profile in the database
  // and set the user as authenticated in the session.
  User.findOrCreate({ oauthId: profile.id }, function (err, user) {
    return cb(err, user);
  });
}));

// Set up the OAuth routes
const app = express();
app.get('/auth/your-oauth-provider', passport.authenticate('oauth2'));
app.get('/auth/your-oauth-provider/callback',
  passport.authenticate('oauth2', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });
```

-- Add the authentication to GQL
```ts
const Query = {
  me: (parent, args, context, info) => {
    if (!context.req.user) {
      throw new Error('Not authenticated');
    }
    // Return the authenticated user's data
    return context.req.user;
  }
};
```

-- Or to distinguish roles:
```ts
const Query = {
  users: (parent, args, context, info) => {
    if (!context.req.user || context.req.user.role !== 'admin') {
      throw new Error('Not authorized');
    }
    // Return all users
    return User.find({});
  }
};
```