import { db } from '../../db';
import { events } from '../../db/schema';
import { eq, ilike, and, sql, desc } from 'drizzle-orm';

export const getAllEvents = async (
    query: {
        search?: string;
        month?: number; // 0-11
        category?: string;
        isFeatured?: boolean;
        sortBy?: 'nearest' | 'newest';
        page?: number;
        limit?: number;
    } = {}
) => {
    const { search, month, category, isFeatured, sortBy, page = 1, limit = 8 } = query;
    const offset = (page - 1) * limit;

    const conditions = [];

    if (search) {
        conditions.push(ilike(events.title, `%${search}%`));
    }

    if (category && category !== 'Semua') {
        conditions.push(eq(events.category, category));
    }

    if (month !== undefined && month !== null) {
        // Filter by month of Start Date
        // Note: This is a simplified check. For strict month checking we might need sql operator
        // In postgres: EXTRACT(MONTH FROM start_date) = month + 1
        conditions.push(sql`EXTRACT(MONTH FROM ${events.startDate}) = ${Number(month) + 1}`);
    }

    if (isFeatured !== undefined) {
        conditions.push(eq(events.isFeatured, isFeatured));
    }

    if (sortBy === 'nearest') {
        conditions.push(sql`${events.startDate} >= NOW()`);
    }

    const whereClause = conditions.length > 0 ? and(...conditions) : undefined;

    let orderBy: any = events.startDate;
    if (sortBy === 'nearest') {
        orderBy = events.startDate; // Ascending by default, nearest future date
    } else if (sortBy === 'newest') {
        orderBy = desc(events.createdAt);
    }

    const data = await db.select()
        .from(events)
        .where(whereClause)
        .limit(limit)
        .offset(offset)
        .orderBy(orderBy);

    // Get total count for pagination
    const totalResult = await db.select({ count: sql<number>`count(*)` })
        .from(events)
        .where(whereClause);

    const total = Number(totalResult[0]?.count || 0);

    return {
        data,
        meta: {
            page: Number(page),
            limit: Number(limit),
            total,
            totalPages: Math.ceil(total / limit)
        }
    };
};

export const getEventBySlug = async (slug: string) => {
    const result = await db.select().from(events).where(eq(events.slug, slug));
    return result[0];
};

export const createEvent = async (data: typeof events.$inferInsert) => {
    const result = await db.insert(events).values(data).returning();
    return result[0];
};

export const deleteEvent = async (id: number) => {
    const result = await db.delete(events).where(eq(events.id, id)).returning();
    return result[0];
};

export const updateEvent = async (id: number, data: Partial<typeof events.$inferInsert>) => {
    const result = await db.update(events).set({ ...data, updatedAt: new Date() }).where(eq(events.id, id)).returning();
    return result[0];
};
