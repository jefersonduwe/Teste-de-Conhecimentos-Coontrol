var pgp = require('pg-promise')();
var db = pgp('postgres://postgres:postgres@localhost:5432/apicoontrol');

module.exports = db;