var express = require('express');
var router = express.Router();
var ms = require('ms');

router.get('/', (req, res, next) => {
    res.render('login');
});

router.post('/', (req, res, next) => {
    var usuarioRep = require('../persistencia/usuario');
    usuarioRep.buscaUsuarioByEmailSenha(req.body.login, req.body.senha)
        .then((usuario) => {
            if (!usuario) {
                return next({ status: 401, message: 'Usuário ou senha inválidos.' });
            }
            var tokenManager = require('./token-manager');
            var token = tokenManager.createToken(usuario);
            res.cookie('authToken', token, { maxAge: ms('1d'), httpOnly: true });
            res.json({
                usuario: usuario,
                token: token
            });
        })
        .catch((err) => {
            next(err);
        });

});

module.exports = router;
