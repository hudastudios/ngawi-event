import { db } from './src/db';
import { settings } from './src/db/schema';
import { eq } from 'drizzle-orm';
import * as dotenv from 'dotenv';
dotenv.config();

async function main() {
    console.log('Testing settings table access...');
    try {
        // Try simple select
        const allSettings = await db.select().from(settings);
        console.log('All settings:', allSettings);

        // Try getting specific setting
        const key = 'home_banner';
        const result = await db.select().from(settings).where(eq(settings.key, key));
        console.log(`Setting '${key}':`, result);

        console.log('Database access successful.');
        process.exit(0);
    } catch (error) {
        console.error('Database error:', error);
        process.exit(1);
    }
}

main();
