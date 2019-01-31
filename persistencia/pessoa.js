var dbPromise = require('./dbPromise');

exports.salvaPessoa = (pessoa) => {
    // Ajustando sexo para salvar
    if (pessoa.sexo == 'masculino') {
        pessoa.sexo = 'm';
    } else if (pessoa.sexo == 'feminino') {
        pessoa.sexo = 'f';
    }
    return new Promise((resolve, reject) => {
        let sql = 'INSERT INTO pessoa (pes_nome, pes_data_nasc, pes_sexo, pes_idade, pes_signo, pes_data_consulta) VALUES ($1, $2, $3, $4, $5, now());';
        console.log(sql, [pessoa.nome, pessoa.dataNasc, pessoa.sexo, pessoa.idade, pessoa.signo]);
        dbPromise.none(sql, [pessoa.nome, pessoa.dataNasc, pessoa.sexo, pessoa.idade, pessoa.signo])
            .then(() => {
                resolve();
            })
            .catch((err) => {
                var errMsg = 'Houve um erro ao salvar a consulta do usuário';
                console.error(errMsg, err);
                reject(err);
            });

    });
}

exports.getAll = () => {
    return new Promise((resolve, reject) => {
        dbPromise.many('SELECT pes_nome as nome, pes_idade as idade, pes_sexo as sexo, pes_signo as signo FROM pessoa;')
            .then((data) => {
                resolve(data);
            })
            .catch((err) => {
                var errMsg = 'Houve um erro ao buscar as pessoas';
                console.error(errMsg, err);
                reject(err);
            });
    });
}