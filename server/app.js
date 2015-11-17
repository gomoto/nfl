var express = require('express');
var stormpath = require('express-stormpath');
var path = require('path');
var config = require('./config/environment');
var stormpathConfig = require('./config/stormpath');

var app = express();

/*
  The config/express file is setting up the static file server which serves your
  angular application assets.  We don't need to authenticate those requests, so
  we do this before calling Stormpath.
*/

require('./config/express')(app);

/*
  The Stormpath middleware must always be the last initialized middleware,
  but must come before any custom route code that you want to protect with Stormpath.
*/

app.use(stormpath.init(app, {
  client: {
    apiKey: {
      id: stormpathConfig.STORMPATH_ID,
      secret: stormpathConfig.STORMPATH_SECRET,
    }
  },
  application: {
    href: stormpathConfig.STORMPATH_HREF
  },
  website: true, //include Login and Registration pages
  web: {
    spaRoot: path.join(__dirname,'..','client','index.html')
  }
}));

require('./routes')(app);

app.on('stormpath.ready', function() {
  app.listen(config.port, config.ip, function () {
    console.log('Listening at http://%s:%s', config.ip || '0.0.0.0', config.port);
  });
});
