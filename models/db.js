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
  connectionLimit: 10, // Maximum number of connections in the pool
  queueLimit: 0, // No limit on queued connections
});

// Function to execute a query
const query = async (sql, params) => {
  try {
    const [rows] = await pool.execute(sql, params);
    return rows;
  } catch (err) {
    console.error("Database query error:", err);
    throw err; // Re-throwing to propagate the error to the caller
  }
};

// Export the query function
module.exports = {
  query,
};
