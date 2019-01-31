var express = require('express');
var router = express.Router();

router.get('/?:inicial&:qtde', (req, res, next) => {
    let inicial = parseInt(req.params.inicial);
    let qtde = parseInt(req.params.qtde)
    let total = inicial + qtde;
    let fibos = [0, 1, 1];
    for (var i = 3; i < total; i++) {
        fibos.push(fibos[i - 1] + fibos[i - 2]);
    }
    res.json(fibos.slice(inicial, total));
})

module.exports = router;