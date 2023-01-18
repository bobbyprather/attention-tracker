const fs = require("fs");
const { parse } = require("csv-parse");
const filepath = './data.db'
const Database = require('better-sqlite3');


module.exports.fetchNotesUsage = function () {
    const db = connectToDatabase();
    const stmt = db.prepare(`SELECT app, COUNT(app) as usage FROM intentions GROUP BY app`);
    const notes = stmt.all();
    console.log(notes);
    db.close();
    return notes;
}

module.exports.fetchNotes = function () {
    const db = connectToDatabase();
    const stmt = db.prepare(`select *  from intentions`);
    const notes = stmt.all();
    console.log(notes);
    db.close();
    return notes;
}

module.exports.dbHasData = function () {
    const db = connectToDatabase();
    const stmt = db.prepare(`select count(*) as dataBaseRecs from intentions`);
    const dbRecs = stmt.get();
    console.log(dbRecs);
    db.close();
    return dbRecs;

}

function connectToDatabase() {
    const createTable = "CREATE TABLE IF NOT EXISTS intentions ( access_ts VARCHAR(24), app VARCHAR(20), description VARCHAR(100)) "
    const db = new Database(filepath, { verbose: console.log })
    db.pragma('journal_mode = WAL');
    db.exec(createTable)
    return db;
}

module.exports.readCSV = function () {
  
    const sql = "INSERT OR REPLACE into intentions VALUES(?,?,?)";
    // const dbRecs = this.dbHasData();
  
    // if (dbRecs.dataBaseRecs == 0) {
        fs.createReadStream("data.csv")
            .pipe(parse({ delimiter: "|", from_line: 1, relax_column_count: true }))
            .on("data", function (row) {
                const db = connectToDatabase();
                const stmt = db.prepare(sql);
                const info = stmt.run(row[0], row[1], row[2])
                db.close();
                // console.log(row);
            }).on("end", () => {
                console.log("finished");
            }).on("error", (error) => {
                console.log(error.message);
            })
    // }

}

