import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  connectionLimit: 5,
  host: process.env.HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

export default pool;
