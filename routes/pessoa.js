var express = require('express');
var router = express.Router();
var pesisPessoa = require('../persistencia/pessoa');

//signos
var signos = {
    1: { 20: 'Capricórnio', 21: 'Aquário' },
    2: { 19: 'Aquário', 20: 'Peixes' },
    3: { 20: 'Peixes', 21: 'Áries' },
    4: { 20: 'Áries', 21: 'Touro' },
    5: { 20: 'Touro', 21: 'Gêmeos' },
    6: { 20: 'Gêmeos', 21: 'Câncer' },
    7: { 21: 'Câncer', 22: 'Leão' },
    8: { 22: 'Leão', 23: 'Virgem' },
    9: { 22: 'Virgem', 23: 'Libra' },
    10: { 22: 'Libra', 23: 'Escorpião' },
    11: { 21: 'Escorpião', 22: 'Sagitário' },
    12: { 21: 'Sagitário', 22: 'Capricórnio' }
};

function getSigno(dia, mes) {
    let signosPossiveis = signos[mes];
    let diaLimite = Object.keys(signosPossiveis)[0];
    if (dia <= diaLimite) {
        return signosPossiveis[diaLimite];
    } else {
        return signosPossiveis[Object.keys(signosPossiveis)[1]];
    }
}

router.post('/', (req, res, next) => {
    let pessoa = req.body;
    let dataNasc = pessoa.dataNasc.split('/');
    let anoNasc = parseInt(dataNasc[2]), mesNasc = parseInt(dataNasc[1]), diaNasc = parseInt(dataNasc[0]);
    let hoje = new Date();
    let anoAtual = hoje.getFullYear(), mesAtual = hoje.getMonth() + 1, diaAtual = hoje.getDate();
    let idade = anoAtual - anoNasc;
    if (mesAtual < mesNasc || mesAtual == mesNasc && diaAtual < diaNasc) {
        idade--;
    }
    pessoa.idade = idade;
    pessoa.signo = getSigno(diaNasc, mesNasc);
    // Gravar no Banco de Dados
    pesisPessoa.salvaPessoa(pessoa)
        // Se gravou com sucesso enviar o retorno
        .then(() => {
            res.json({
                idade: idade,
                signo: pessoa.signo
            });
        })
        // Se houve um erro ao gravar retornar o erro
        .catch((err) => {
            next(err);
        })
})

router.get('/', (req, res, next) => {
    pesisPessoa.getAll()
        .then((data) => {
            res.render('pessoa', { pessoas: data })
        })
        .catch((err) => {
            next(err)
        });
});

module.exports = router;
