const { Client } = require('pg');
require('dotenv').config();

const client = new Client({
    connectionString: process.env.DATABASE_URL,
});

async function checkSubmissions() {
    try {
        await client.connect();
        const res = await client.query('SELECT id, "event_name", "poster_url" FROM submissions ORDER BY id DESC LIMIT 5');
        console.log(res.rows);
    } catch (err) {
        console.error('Error fetching submissions:', err);
    } finally {
        await client.end();
    }
}

checkSubmissions();
