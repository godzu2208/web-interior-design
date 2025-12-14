import mysql from "mysql2/promise";
import { config } from "dotenv";

// Initialize dotenv
config();

// ============================================
// CONNECTION POOL CONFIGURATION
// ============================================

const poolConfig = {
  host: process.env.DB_HOST || "localhost",
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "Linh2051120137?",
  database: process.env.DB_NAME || "noithat_db",

  // Pool settings
  waitForConnections: true,
  connectionLimit: 10,
  maxIdle: 10,
  idleTimeout: 60000,
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0,

  // Character set
  charset: "utf8mb4",

  // Timezone
  timezone: "+07:00", // Vietnam timezone
};

// ============================================
// CREATE CONNECTION POOL
// ============================================

const pool = mysql.createPool(poolConfig);

// ============================================
// TEST CONNECTION
// ============================================

const testConnection = async () => {
  try {
    const connection = await pool.getConnection();
    console.log("✓ MySQL Database connected successfully!");
    console.log(`  Database: ${poolConfig.database}`);
    console.log(`  Host: ${poolConfig.host}:${poolConfig.port}`);
    connection.release();
    return true;
  } catch (error) {
    console.error("✗ MySQL Database connection failed:");
    console.error(`  Error: ${error.message}`);
    return false;
  }
};

// Auto test connection on startup
testConnection();

// ============================================
// HELPER FUNCTIONS
// ============================================

/**
 * Execute a query with parameters
 * @param {String} sql - SQL query string
 * @param {Array} params - Query parameters
 * @returns {Promise<Array>} Query results
 */
const query = async (sql, params = []) => {
  try {
    const [rows] = await pool.execute(sql, params);
    return [rows];
  } catch (error) {
    console.error("Database query error:", error);
    throw error;
  }
};

/**
 * Execute multiple queries in a transaction
 * @param {Function} callback - Callback function with connection
 * @returns {Promise<any>} Transaction result
 */
const transaction = async (callback) => {
  const connection = await pool.getConnection();

  try {
    await connection.beginTransaction();
    const result = await callback(connection);
    await connection.commit();
    return result;
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
};

/**
 * Get pool statistics
 * @returns {Object} Pool stats
 */
const getPoolStats = () => {
  return {
    totalConnections: pool.pool._allConnections.length,
    activeConnections:
      pool.pool._allConnections.length - pool.pool._freeConnections.length,
    idleConnections: pool.pool._freeConnections.length,
    queuedRequests: pool.pool._connectionQueue.length,
  };
};

/**
 * Close all connections (for graceful shutdown)
 * @returns {Promise<void>}
 */
const closePool = async () => {
  try {
    await pool.end();
    console.log("✓ MySQL connection pool closed");
  } catch (error) {
    console.error("✗ Error closing MySQL pool:", error);
  }
};

// ============================================
// GRACEFUL SHUTDOWN
// ============================================

process.on("SIGINT", async () => {
  console.log("\nReceived SIGINT, closing database connections...");
  await closePool();
  process.exit(0);
});

process.on("SIGTERM", async () => {
  console.log("\nReceived SIGTERM, closing database connections...");
  await closePool();
  process.exit(0);
});

// ============================================
// EXPORTS
// ============================================

export { pool, query, transaction, testConnection, getPoolStats, closePool };

export default pool;
