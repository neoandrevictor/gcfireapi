const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('mydatabase.db');

db.serialize(function () {
    db.run("DROP TABLE APARTAMENTOS");
    db.run("CREATE TABLE APARTAMENTOS (TORRE int, APARTAMENTO int, COR string)");

    const stmt = db.prepare("INSERT INTO APARTAMENTOS VALUES (?,?,?)");
    for (let i = 1; i <= 7; i++) {
        for (let k = 1; k <= 22; k++) {
            if ((i == 1 || i == 2 || i == 3 || i == 6 || i == 7) && k == 21) {
                break;
            }
            if ((i == 5) && k == 22) {
                break;
            }
            for (let j = 1; j <= 8; j++) {

                stmt.run(i, k * 100 + j, 'preto');
            }
        }
    }
    stmt.finalize();

    db.each("SELECT rowid AS id, TORRE, APARTAMENTO, COR FROM APARTAMENTOS", function (err, row) {
        console.log(row.id + ": " + row.TORRE + " - " + row.APARTAMENTO + " - " + row.COR);
    });
});

db.close();