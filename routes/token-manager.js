var expressJwt = require('express-jwt');
var jwt = require('jsonwebtoken');
var secret = 'segredo';
exports.tokenValidator = expressJwt({
    secret: secret,
    getToken: (req) => {
        return req.cookies.authToken;
    },
    resultProperty: 'locals.usuario'
}).unless({
    path: [
        '/',
        '/login'
    ]
});

exports.createToken = usuario => {
    return jwt.sign(usuario, secret, { expiresIn: '1d' });
};