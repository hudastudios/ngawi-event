const { Client } = require('pg');
require('dotenv').config();

const dbName = 'ngawi_event_calendar';
const connectionString = process.env.DATABASE_URL.replace(`/${dbName}`, '/postgres');

const client = new Client({
    connectionString: connectionString,
});

async function createDb() {
    try {
        await client.connect();
        const res = await client.query(`SELECT 1 FROM pg_database WHERE datname = '${dbName}'`);
        if (res.rowCount === 0) {
            await client.query(`CREATE DATABASE "${dbName}"`);
            console.log(`Database ${dbName} created successfully.`);
        } else {
            console.log(`Database ${dbName} already exists.`);
        }
    } catch (err) {
        console.error('Error creating database:', err);
    } finally {
        await client.end();
    }
}

createDb();
