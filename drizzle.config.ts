import type { Config } from "drizzle-kit";
import * as dotenv from "dotenv";
dotenv.config({ path: ".env" });

export default {
	driver: "pg",
	schema: "./src/db/schema.ts",
	dbCredentials: {
		connectionString: process.env.NEONDB_URL!,
	},
} satisfies Config;
