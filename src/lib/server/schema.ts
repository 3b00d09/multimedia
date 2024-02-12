import { pgTable, bigint, varchar, timestamp, foreignKey, boolean } from "drizzle-orm/pg-core";

export const usersTable = pgTable("user", {
	id: varchar("id", {
		length: 15 // change this when using custom user ids
	}).primaryKey(),
	// other user attributes
	username: varchar("username",{
		length: 24
	}).notNull().unique(),
	firstName:varchar("first_name",{
		length:24
	}),
	lastName:varchar("last_name",{
		length:24
	}),
	bio:varchar("bio",{
		length: 244
	}),
	profileBackgroundUrl:varchar("profile_background_url").default("https://ikcxvcutdjftdsvbpwsa.supabase.co/storage/v1/object/sign/background-images/default-img.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJiYWNrZ3JvdW5kLWltYWdlcy9kZWZhdWx0LWltZy5wbmciLCJpYXQiOjE3MDc2MDc0NTcsImV4cCI6MTAzNDc1MjEwNTd9.jVcmsigcoSU1nrIv6ci71_VZrpFv0mzTvv6XuW2J_Aw&t=2024-02-10T23%3A24%3A20.028Z").notNull(),
	profilePictureUrl: varchar("profile_pic_url").default("https://ikcxvcutdjftdsvbpwsa.supabase.co/storage/v1/object/sign/profile-images/default-img.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJwcm9maWxlLWltYWdlcy9kZWZhdWx0LWltZy5wbmciLCJpYXQiOjE3MDM0ODg4NjYsImV4cCI6MjAxODg0ODg2Nn0.EeYXUptq697XMxEb5XpbVTtwzm2qwrI2w8cxrD4OySk&t=2023-12-25T07%3A21%3A06.400Z").notNull()
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
	}).notNull().references(()=>usersTable.id),
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
	}).notNull().references(()=>usersTable.id,{onUpdate:"cascade"}
	),
	post: varchar("post",{
		length: 255
	}).references(()=>{
		return postsTable.id
	}),
	date:timestamp("date"),
	parentCommentId:varchar("parent_comment_id",{
		length: 244,
	})
},(table)=>{
	return{
		parentReference:foreignKey({
			columns:[table.parentCommentId],
			foreignColumns:[table.id],
			name:"custom comment to comment fk"
		}),
	};
})


export const categoriesTable = pgTable("categories",{
	id: varchar("id",{
		length: 244
	}).notNull().primaryKey(),
	name: varchar("name",{
		length: 24,
	}).notNull()
})

export const likesPostTable = pgTable("likes_post", {
	id: varchar("id", {
					length: 244
	}).primaryKey(),
	post: varchar("post", {
					length: 255
	}).references(() => {
					return postsTable.id;
	}),
	author: varchar("author", {
					length: 24
	}).notNull().references(() => usersTable.id,{onUpdate:"cascade"} 
	),
	date: timestamp("date")
});

export const likesCommentTable = pgTable("likes_comment", {
	id: varchar("id", {
					length: 244
	}).primaryKey(),
		 comment: varchar("comment", {
					length: 255
	}).references(() => {
					return commentsTable.id;
	}),
	author: varchar("author", {
					length: 24
	}).notNull().references(() => usersTable.id,{onUpdate:"cascade"} 
	),
	date: timestamp("date")
});


export const userFollowsTable = pgTable("user_follows",{
	id: varchar("id",{
		length: 244
	}).notNull().primaryKey(),
	follower: varchar("follower",{
		length: 15,
	}).notNull().references(()=>usersTable.id,{onUpdate:"cascade"}),
	following: varchar("following",{
		length: 15,
	}).notNull().references(()=>usersTable.id,{onUpdate:"cascade"})
})

export const notificationsTable = pgTable("notifications",{
	id: varchar("id",{
		length:244,
	}).primaryKey().notNull(),
	sourceUser: varchar("source_user",{
		length: 15
	}).notNull().references(()=>{
		return usersTable.id
	}),
	targetUser: varchar("target_user",{
		length: 15
	}).notNull().references(()=>{
		return usersTable.id
	}),
	postId:varchar("post_id",{
		length:255
	}).references(()=>{
		return postsTable.id
	}),
	commentId:varchar("comment_id",{
		length:255
	}).references(()=>{
		return commentsTable.id
	}),
	type:varchar("type",{
		length: 15
	}).notNull(),
	read:boolean("read").default(false)
})