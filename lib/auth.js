/**
 * @author  Hamza Waqas <hamzawaqas@live.com>
 * @since   1/14/14
 */

(function() {

    var _ = require('lodash')
        , util = require('util')
        , request = require('request')
        , OAUTH_HOST = "https://www.linkedin.com/uas/oauth2/"

    var Auth = function(Inherits, args) {
        Inherits(this);

        this.options = {};

        this.generateAuthUrl = function(opts, scope) {
            return util.format(OAUTH_HOST + "authorization?response_type=code" +
                "&client_id=%s" +
                "&scope=%s" +
                "&state=%s" +
                "&redirect_uri=%s",
                opts.appId,
                scope.join(' '),
                Math.random(),
                opts.redirectUri
            );
        };

        this.authorize = function(res, scope) {
            res.redirect(this.generateAuthUrl(args, scope));
        };

        this.generateAccessTokenUrl = function(opts, code) {
            return util.format(OAUTH_HOST + "accessToken?grant_type=authorization_code" +
                "&code=%s" +
                "&redirect_uri=%s" +
                "&client_id=%s" +
                "&client_secret=%s",
                code,
                opts.redirectUri,
                opts.appId,
                opts.appSecret
            );
        };

        this.getAccessToken = function(res, code, cb) {
            url = this.generateAccessTokenUrl(args, code)

            request.get(url, function(err, response, body) {
                if (err)
                    return cb(err, null);
                return cb(null, body);
            })
        };

        this.setAccessToken = function(accessToken) {
            this.options['accessToken'] = accessToken;
        };

        this.getOptions = function() {
            return this.options;
        }

        return this;
    }.bind(this);
    module.exports = Auth;
}).call(this);
