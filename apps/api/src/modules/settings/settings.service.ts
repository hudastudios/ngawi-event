import { db } from '../../db';
import { settings } from '../../db/schema';
import { eq } from 'drizzle-orm';

export const getSetting = async (key: string) => {
    const result = await db.select().from(settings).where(eq(settings.key, key));
    return result[0]?.value;
};

export const updateSetting = async (key: string, value: string) => {
    // Upsert logic
    const existing = await getSetting(key);
    if (existing) {
        const result = await db.update(settings)
            .set({ value, updatedAt: new Date() })
            .where(eq(settings.key, key))
            .returning();
        return result[0];
    } else {
        const result = await db.insert(settings)
            .values({ key, value })
            .returning();
        return result[0];
    }
};
