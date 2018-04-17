'use strict';
var config = require('../../server/config.json');
var path = require('path');

module.exports = function(Client) {
    Client.afterRemote('create', function(context, userInstance, next) {
        console.log('> user.afterRemote triggered');
        var options = {
            type: 'email',
            to: userInstance.email,
            from: 'noreply@loopback.com',
            subject: 'Thanks for registering.',
            template: path.resolve(__dirname, '../../server/views/verify.ejs'),
            redirect: config.front+"/login",
            user: Client
          };
          userInstance.verify(options, function(err, response, next) {
            if (err) return next(err);

            console.log('> verification email sent:', response);
            // context.res.render('response', {
            //   title: 'Signed up successfully',
            //   content: 'Please check your email and click on the verification link ' -
            //       'before logging in.',
            //   redirectTo: '/',
            //   redirectToLinkText: 'Log in'
            // });
          });
              next();

    });
    Client.on('resetPasswordRequest', function(info) {

        var url = 'http://' + config.host +  '/reset-password';
        var html = 'Click <a href="' + url + '?access_token=' +
        info.accessToken.id + '">here</a> to reset your password';
        console.log(html);
        //'here' in above html is linked to : 'http://<host:port>/reset-password?access_token=<short-lived/temporary access token>'
        Client.app.models.Email.send({
          to: info.email,
          from: info.email,
          subject: 'Password reset',
          html: html
        }, function(err) {
          if (err) return console.log('> error sending password reset email');
          console.log('> sending password reset email to:', info.email);
        });
      });
      //...

};
