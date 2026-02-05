import { pgTable, serial, text, timestamp, varchar, boolean, pgEnum, json } from 'drizzle-orm/pg-core';

export const eventStatusEnum = pgEnum('event_status', ['DRAFT', 'PUBLISHED', 'PAST']);
export const submissionStatusEnum = pgEnum('submission_status', ['PENDING', 'APPROVED', 'REJECTED']);

export const events = pgTable('events', {
    id: serial('id').primaryKey(),
    title: varchar('title', { length: 255 }).notNull(),
    slug: varchar('slug', { length: 255 }).notNull().unique(),
    description: text('description'),
    category: varchar('category', { length: 100 }).notNull(),
    location: varchar('location', { length: 255 }).notNull(),
    locationDetails: text('location_details'),
    startDate: timestamp('start_date').notNull(),
    endDate: timestamp('end_date').notNull(),
    timeString: varchar('time_string', { length: 100 }),
    organizer: varchar('organizer', { length: 255 }),
    imageUrl: text('image_url'),
    galleryUrls: text('gallery_urls').array(),
    isFeatured: boolean('is_featured').default(false).notNull(),
    status: eventStatusEnum('status').default('DRAFT').notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const submissions = pgTable('submissions', {
    id: serial('id').primaryKey(),
    eventName: varchar('event_name', { length: 255 }).notNull(),
    category: varchar('category', { length: 100 }).notNull(),
    organizerName: varchar('organizer_name', { length: 255 }).notNull(),
    whatsapp: varchar('whatsapp', { length: 50 }).notNull(),
    description: text('description').notNull(),
    location: varchar('location', { length: 255 }).notNull(),
    locationDetails: text('location_details'),
    websiteUrl: text('website_url'),
    posterUrl: text('poster_url'),
    galleryUrls: text('gallery_urls').array(),
    startDate: timestamp('start_date').notNull(),
    endDate: timestamp('end_date').notNull(),
    dateRanges: json('date_ranges'), // Stores array of {startDate, endDate}
    status: submissionStatusEnum('status').default('PENDING').notNull(),
    submittedAt: timestamp('submitted_at').defaultNow().notNull(),
});

// Better Auth Tables
export const user = pgTable("user", {
    id: text("id").primaryKey(),
    name: text("name").notNull(),
    email: text("email").notNull().unique(),
    emailVerified: boolean("email_verified").notNull(),
    image: text("image"),
    createdAt: timestamp("created_at").notNull(),
    updatedAt: timestamp("updated_at").notNull(),
});

export const session = pgTable("session", {
    id: text("id").primaryKey(),
    expiresAt: timestamp("expires_at").notNull(),
    token: text("token").notNull().unique(),
    createdAt: timestamp("created_at").notNull(),
    updatedAt: timestamp("updated_at").notNull(),
    ipAddress: text("ip_address"),
    userAgent: text("user_agent"),
    userId: text("user_id").notNull().references(() => user.id),
});

export const account = pgTable("account", {
    id: text("id").primaryKey(),
    accountId: text("account_id").notNull(),
    providerId: text("provider_id").notNull(),
    userId: text("user_id").notNull().references(() => user.id),
    accessToken: text("access_token"),
    refreshToken: text("refresh_token"),
    idToken: text("id_token"),
    accessTokenExpiresAt: timestamp("access_token_expires_at"),
    refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
    scope: text("scope"),
    password: text("password"),
    createdAt: timestamp("created_at").notNull(),
    updatedAt: timestamp("updated_at").notNull(),
});

export const verification = pgTable("verification", {
    id: text("id").primaryKey(),
    identifier: text("identifier").notNull(),
    value: text("value").notNull(),
    expiresAt: timestamp("expires_at").notNull(),
    createdAt: timestamp("created_at"),
    updatedAt: timestamp("updated_at"),
});

export const settings = pgTable('settings', {
    key: varchar('key', { length: 255 }).primaryKey(),
    value: text('value'),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
});
