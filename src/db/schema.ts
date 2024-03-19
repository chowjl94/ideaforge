import {
	integer,
	text,
	pgTable,
	serial,
	timestamp,
	varchar,
	pgEnum,
} from "drizzle-orm/pg-core";

//enum table
export const roleEnum = pgEnum("role_enum", ["system", "user"]);

// each chat is a table
export const chats = pgTable("chats", {
	id: serial("id").primaryKey(),
	fileName: text("file_name").notNull(),
	fileUrl: text("file_url").notNull(),
	fileKey: text("file_key").notNull(), // for maping of file to S3
	createdAt: timestamp("created_at").notNull().defaultNow(),
	userId: varchar("user_id", { length: 256 }).notNull(), // clerk userID
});

// table of messages
export const messages = pgTable("messages", {
	id: serial("id").primaryKey(),
	chatId: integer("chat_id")
		.references(() => chats.id)
		.notNull(), // each message belongs to a chat
	chatContent: text("chat_content").notNull(),
	createdAt: timestamp("created_at").notNull().defaultNow(),
	role: roleEnum("role").notNull(),
});

export const user_subscriptions = pgTable("user_subscriptions", {
	id: serial("id").primaryKey(),
	userId: varchar("user_id", { length: 256 }).notNull().unique(),
	stripeCustId: varchar("stripe_cust_id", { length: 256 }).notNull().unique(),
	stripeSubId: varchar("stripe_sub_id", {
		length: 256,
	}).unique(),
	stripePriceId: varchar("stripe_price_id", { length: 256 }),
	stripeCurrentPeriodEnd: timestamp("stripe_current_period_ended_at"),
});
