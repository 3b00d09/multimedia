import { pgTable, bigint, varchar, timestamp, date } from "drizzle-orm/pg-core";

export const usersTable = pgTable("user", {
	id: varchar("id", {
		length: 15 // change this when using custom user ids
	}).primaryKey(),
	// other user attributes
	username: varchar("username",{
		length: 24
	}).notNull().unique()
});

export const sessionsTable = pgTable("user_session", {
	id: varchar("id", {
		length: 128
	}).primaryKey(),
	userId: varchar("user_id", {
		length: 15
	})
		.notNull()
		.references(() => usersTable.id),
	activeExpires: bigint("active_expires", {
		mode: "number"
	}).notNull(),
	idleExpires: bigint("idle_expires", {
		mode: "number"
	}).notNull()
});

export const keysTable = pgTable("user_key", {
	id: varchar("id", {
		length: 255
	}).primaryKey(),
	userId: varchar("user_id", {
		length: 15
	})
		.notNull()
		.references(() => {
			return usersTable.id
		}),
	hashedPassword: varchar("hashed_password", {
		length: 255
	})
});

export const postsTable = pgTable("posts",{
    id: varchar("id",{
        length: 255,
    }).primaryKey()
    .notNull(),
    content:varchar("content",{
        length: 255,
    })
    .notNull(),
	author: varchar("author",{
		length: 24
	}).notNull().references(()=>{
		return usersTable.username
	}),
	timestamp: timestamp("timestamp") 

})

export const commentsTable = pgTable("comments",{
	id: varchar("id",{
		length:244
	}).notNull()
	.primaryKey(),
	comment:varchar("comment",{
		length: 256
	}).notNull(),
	author:varchar("author",{
		length: 24
	}).notNull().references(()=>{
		return usersTable.username
	}),
	post: varchar("post",{
		length: 255
	}).notNull().references(()=>{
		return postsTable.id
	}),
	date:timestamp("date")
})

export const repliesTable = pgTable("replies",{
	id: varchar("id",{
		length:244
	}).notNull().primaryKey(),
	reply: varchar("reply",{
		length:256
	}).notNull(),
	originalComment:varchar("original_comment",{
		length: 256
	}).notNull().references(()=>{
		return commentsTable.id
	})
})

export const categoriesTable = pgTable("categories",{
	id: varchar("id",{
		length: 244
	}).notNull().primaryKey(),
	name: varchar("name",{
		length: 24,
	}).notNull()
})