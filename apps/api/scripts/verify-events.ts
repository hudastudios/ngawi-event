
import { db } from '../src/db';
import { events } from '../src/db/schema';
import { count, gte, lte, and } from 'drizzle-orm';

async function verify() {
    console.log('🔍 Verifying event data...');

    const allEvents = await db.select().from(events);
    console.log(`Total events found: ${allEvents.length}`);

    // Check specific months
    const year = 2026;
    for (let month = 1; month <= 11; month++) {
        const startOfMonth = new Date(year, month, 1);
        const endOfMonth = new Date(year, month + 1, 0, 23, 59, 59);

        // This is a rough check in JS for simplicity of script
        const eventsInMonth = allEvents.filter(e => {
            const date = new Date(e.startDate);
            return date >= startOfMonth && date <= endOfMonth;
        });

        console.log(`Month ${month + 1}/${year}: ${eventsInMonth.length} events`);
        if (eventsInMonth.length < 5) {
            console.warn(`⚠️ Warning: Month ${month + 1} has fewer than 5 events!`);
        }
    }

    if (allEvents.length > 0) {
        console.log('Sample Event:', allEvents[0].title, '|', allEvents[0].startDate);
    }

    process.exit(0);
}

verify();
