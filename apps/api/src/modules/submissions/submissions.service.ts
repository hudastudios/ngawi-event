import { db } from '../../db';
import { submissions, events } from '../../db/schema';
import { eq } from 'drizzle-orm';


export const getAllSubmissions = async () => {
    return await db.select().from(submissions);
};

export const createSubmission = async (data: typeof submissions.$inferInsert) => {
    const result = await db.insert(submissions).values(data).returning();
    return result[0];
};


export const getSubmissionById = async (id: number) => {
    const result = await db.select().from(submissions).where(eq(submissions.id, id));
    return result[0];
};

// Helper to slugify
const slugify = (text: string) => {
    return text.toString().toLowerCase()
        .replace(/\s+/g, '-')           // Replace spaces with -
        .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
        .replace(/\-\-+/g, '-')         // Replace multiple - with single -
        .replace(/^-+/, '')             // Trim - from start of text
        .replace(/-+$/, '');            // Trim - from end of text
}


export const approveSubmission = async (id: number) => {
    const submission = await getSubmissionById(id);
    if (!submission) throw new Error("Submission not found");

    // Determine Date Ranges
    // Determine Date Ranges (Robust Parsing)
    let ranges: { startDate: Date | string, endDate: Date | string }[] = [];

    const processItem = (item: any): any[] => {
        if (!item) return [];
        if (typeof item === 'object') return [item];
        if (typeof item === 'string') {
            if (item.includes('[object Object]')) return [];
            try {
                const parsed = JSON.parse(item);
                if (Array.isArray(parsed)) return parsed;
                if (typeof parsed === 'object') return [parsed];
            } catch (e) {
                // console.error("Parse error for item:", item);
            }
        }
        return [];
    };

    if (submission.dateRanges) {
        if (Array.isArray(submission.dateRanges)) {
            // Check if it's an array of objects or strings
            // Drizzle might return ["{...}", "{...}"] or [{...}, {...}]
            (submission.dateRanges as any[]).forEach(item => {
                ranges = [...ranges, ...processItem(item)];
            });
        } else {
            ranges = processItem(submission.dateRanges);
        }
    }

    // Filter valid ranges
    ranges = ranges.filter(r => r && (r.startDate || (r as any).start_date) && (r.endDate || (r as any).end_date));

    // Fallback to single start/end date if no ranges found or valid
    if (ranges.length === 0) {
        ranges.push({
            startDate: submission.startDate,
            endDate: submission.endDate
        });
    }

    // Create Event for EACH range
    const createdEvents = [];
    for (const range of ranges) {
        // Normalize keys
        const start = range.startDate || (range as any).start_date;
        const end = range.endDate || (range as any).end_date;

        if (!start || !end) continue;

        const eventData = {
            title: submission.eventName,
            slug: slugify(submission.eventName) + '-' + Date.now() + '-' + Math.floor(Math.random() * 1000), // Unique slug per event
            description: submission.description,
            category: submission.category,
            location: submission.location,
            startDate: new Date(start),
            endDate: new Date(end),
            organizer: submission.organizerName,
            imageUrl: submission.posterUrl,
            galleryUrls: submission.galleryUrls,
            locationDetails: submission.locationDetails,
            status: 'PUBLISHED' as const
        };
        const result = await db.insert(events).values(eventData).returning();
        createdEvents.push(result[0]);
    }

    // Update Submission Status
    const result = await db.update(submissions)
        .set({ status: 'APPROVED' })
        .where(eq(submissions.id, id))
        .returning();

    return result[0];
};

export const rejectSubmission = async (id: number) => {
    const result = await db.update(submissions)
        .set({ status: 'REJECTED' })
        .where(eq(submissions.id, id))
        .returning();
    return result[0];
};
