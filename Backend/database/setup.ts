import Database from "better-sqlite3";

const db = new Database("mydatabase.db");

console.log("Database connected!");

// Create the users table if it doesn't exist
db.prepare(
  `
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT, 
    email TEXT, 
    phone TEXT
  )
`
).run();

export default db;
