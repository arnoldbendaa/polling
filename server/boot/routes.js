'use strict';
module.exports = function(app) {
    // Install a "/ping" route that returns "pong"
    app.get('/ping', function(req, res) {
      res.send('pong');
    });

    app.post('/api/Clients/login', function(req, res) {
        console.log(req.body);
        var User = app.models.Client;
        User.login({
          "email": req.body.email,
          "password": req.body.password
        }, 'client', function(err, token) {
          console.log(token);
          if (err) {
            res.render('loginErr', { //render view named 'response.ejs'
              title: 'Login failed',
              content: err,
              redirectTo: '/',
              redirectToLinkText: 'Try again'
            });
            return;
          }else {
            var userId = token.userId;
            var Client = app.models.Client;
            Client.findById(userId,function(err,instance){
              res.render('loginOk',{
                ttl:token.ttl,
                userId:token.userId,
                created:token.created,
                id:token.id,
                userName:instance.username,
                locationId:instance.locationId
              });
            });
          }
        });
      });

      app.post('/request-password-reset', function(req, res, next) {
        var Client = app.models.Client;
        console.log(req.body.email);
        Client.resetPassword({
          email: req.body.email
        }, function(err) {
          if (err) return res.status(401).send(err);

          res.render('response', {
            title: 'Password reset requested',
            content: 'Check your email for further instructions',
            redirectTo: '/',
            redirectToLinkText: 'Log in'
          });
        });
      });
      app.get('/reset-password', function(req, res, next) {
        if (!req.accessToken) return res.sendStatus(401);
        res.render('password-reset', {
          redirectUrl: '/api/Clients/reset-password?access_token='+
            req.accessToken.id
        });
      });


    };
