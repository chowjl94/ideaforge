import { NeonQueryFunction, neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

if (!process.env.NEONDB_URL) {
	throw new Error("database url not found");
}

const sql: NeonQueryFunction<boolean, boolean> = neon(process.env.NEONDB_URL!);

export const db = drizzle(sql);
