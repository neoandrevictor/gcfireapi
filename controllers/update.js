module.exports = function (app) {
    app.post('/update', function (req, res) {
        var envio = req.body;
        console.log(envio);
        let torre = envio.torre;
        let apartamento = envio.apartamento;
        let cor = envio.cor;

        let sql = "UPDATE APARTAMENTOS SET COR='" + cor + "' WHERE TORRE=" + torre + " AND APARTAMENTO=" + apartamento;
        console.log(sql);

        const sqlite3 = require('sqlite3').verbose();
        const db = new sqlite3.Database('mydatabase.db');

        db.serialize(function () {
            db.run(sql);

        });

        db.close();
    })


}

