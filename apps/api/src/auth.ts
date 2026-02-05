import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "./db";
import * as schema from "./db/schema";

export const auth = betterAuth({
    database: drizzleAdapter(db, {
        provider: "pg",
        schema: {
            // Mapping tables if names differ, but ours match the defaults roughly
            // user: schema.user,
            // session: schema.session,
            // account: schema.account,
            // verification: schema.verification
        }
    }),
    emailAndPassword: {
        enabled: true
    },
});
