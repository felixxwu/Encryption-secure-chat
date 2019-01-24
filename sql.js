const { Pool } = require("pg");
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: true
});

module.exports = { query: query };

async function query(query) {
    try {
        const client = await pool.connect();
        const result = await client.query(query);
        const results = { results: result ? result.rows : null };
        client.release();
        return results;
    } catch (err) {
        console.error(err);
        return null;
    }
}
