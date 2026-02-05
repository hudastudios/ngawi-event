
import { db } from '../src/db';
import { submissions } from '../src/db/schema';
import { desc } from 'drizzle-orm';

async function main() {
    console.log('Fetching latest submission...');
    const result = await db.select().from(submissions).orderBy(desc(submissions.createdAt)).limit(1);

    if (result.length === 0) {
        console.log('No submissions found.');
        return;
    }

    const sub = result[0];
    console.log('Latest Submission ID:', sub.id);
    console.log('Event Name:', sub.eventName);
    console.log('Date Ranges (Raw):', sub.dateRanges);
    console.log('Date Ranges (Type):', typeof sub.dateRanges);
    if (Array.isArray(sub.dateRanges)) {
        console.log('Date Ranges [0]:', sub.dateRanges[0]);
        console.log('Keys of [0]:', Object.keys(sub.dateRanges[0] as object));
    }
}

main().catch(console.error).then(() => process.exit(0));
