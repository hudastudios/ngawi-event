import cron from 'node-cron';
import { db } from './db';
import { events } from './db/schema';
import { lt } from 'drizzle-orm';

// Run every day at midnight
cron.schedule('0 0 * * *', async () => {
    console.log('Running auto-delete cron job...');
    try {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);

        const result = await db.delete(events)
            .where(lt(events.endDate, yesterday))
            .returning();

        if (result.length > 0) {
            console.log(`Deleted ${result.length} past events.`);
        } else {
            console.log('No past events found to delete.');
        }
    } catch (error) {
        console.error('Error running auto-delete cron job:', error);
    }
});
