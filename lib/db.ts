import mysql from "mysql2/promise";

/**
 * Server-only MySQL pool.
 * Requires env:
 *  - DB_HOST
 *  - DB_USER
 *  - DB_PASS
 *  - DB_NAME
 */
export const db = mysql.createPool({
  host: process.env.DB_HOST!,
  user: process.env.DB_USER!,
  password: process.env.DB_PASS!,
  database: process.env.DB_NAME!,
  connectionLimit: 10,
});
