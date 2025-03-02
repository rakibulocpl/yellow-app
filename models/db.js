const mysql = require("mysql2/promise");
require("dotenv").config();

// Create a MySQL connection pool
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 3306, // Default MySQL port
  waitForConnections: true,
  connectionLimit: 10, // Maximum number of connections
  queueLimit: 0, // No limit on the queue
});

// Function to execute a query
const query = async (sql, params) => {
  try {
    const [rows] = await pool.execute(sql, params);
    return rows;
  } catch (err) {
    console.error("Database query error:", err);
    throw err;
  }
};

// Export the query function
module.exports = {
  query,
};
