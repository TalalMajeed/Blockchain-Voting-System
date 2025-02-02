const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./database/users.db");

db.serialize(function () {
  db.run("CREATE TABLE users (id INTEGER PRIMARY KEY, email TEXT, phone TEXT)");
});
db.close();

export default db;
