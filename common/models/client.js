'use strict';
var config = require('../../server/config.json');
var path = require('path');
var qs = require('querystring');module.exports = function(Client) {
    Client.afterRemote('create', function(context, userInstance, next) {
        console.log('> user.afterRemote triggered');
        var options = {
            type: 'email',
            to: userInstance.email,
            from: 'noreply@loopback.com',
            text:'{href}',
            subject: 'Thanks for registering.',
            template: path.resolve(__dirname, '../../server/views/verify.ejs'),
            redirect: config.front+"/login",
            user: Client
          };
        console.log("user Instance is ");
        console.log(userInstance);
          userInstance.verify(options, function(err, response, next) {
            if (err) return next(err);

            console.log('> verification email sent:', response);

          });
        next();
    });
    Client.beforeRemote( 'create', function(context, userInstance, next){
        userInstance.created = Date.now();
        context.args.data.created = Date.now();

        next();

    })
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

    Client.once('attached',function(){
        Client.confirm = function(uid, token, redirect, fn) {
            console.log("you clicked confirm function");
            // fn = fn || utils.createPromiseCallback();
            this.findById(uid, function(err, user) {
                if (err) {
                    fn(err);
                } else {
                    if (user && user.verificationToken === token) {
                        user.verificationToken = token;
                        user.emailVerified = true;
                        user.save(function(err) {
                            if (err) {
                                fn(err);
                            } else {
                                fn();
                            }
                        });
                    } else {
                        if (user) {
                            err = new Error('Invalid token: %s', token);
                            err.statusCode = 400;
                            err.code = 'INVALID_TOKEN';
                        } else {
                            err = new Error('User not found: %s', uid);
                            err.statusCode = 404;
                            err.code = 'USER_NOT_FOUND';
                        }
                        fn(err);
                    }
                }
            });
            return fn.promise;


        };
    });


    Client.remoteMethod("getPropoals",{
        http:{path:"/getPropoals",verb:'get'},
        returns:{arg:'proposals',type:'string'}
    });

};
