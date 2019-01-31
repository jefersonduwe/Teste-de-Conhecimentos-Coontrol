var dbPromise = require('./dbPromise');

exports.buscaUsuarioByEmailSenha = function (login, senha) {
    var crypto = require('crypto');
    senha = crypto.createHash('md5').update(senha).digest('hex');
    return new Promise(function (resolve, reject) {
        dbPromise.oneOrNone('SELECT usu_login as login FROM usuario WHERE usu_login = $1 AND usu_senha = $2', [login, senha])
                .then(function (usuario) {
                    resolve(usuario);
                })
                .catch(function (err) {
                    var errMsg = 'Houve um erro ao buscar o usuário.';
                    console.error(errMsg, err);
                    reject(new Error(errMsg));
                });
    });
};