module.exports = function (app) {
    app.get('/get', function (req, res) {
        console.log('Recebida requisao de teste na porta 3000.');

        let sql = "SELECT * FROM APARTAMENTOS";
        let resultado = [];

        console.log(sql);

        const sqlite3 = require('sqlite3').verbose();
        const db = new sqlite3.Database('mydatabase.db');

        db.serialize(function () {
            db.each("SELECT rowid AS id, TORRE, APARTAMENTO, COR FROM APARTAMENTOS", function (err, row) {
                console.log(row.id + ": " + row.TORRE + " - " + row.APARTAMENTO + " - " + row.COR);
                resultado.push({ id: row.id, torre: row.TORRE, apartamento: row.APARTAMENTO, cor: row.COR });
            }, function () {
                db.close();
                res.json(resultado);
            });
        });
    });
};
