import { serial } from "drizzle-orm/mysql-core";
import { pgTable, bigint, varchar, timestamp, foreignKey, boolean, integer } from "drizzle-orm/pg-core";

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
	password: varchar("hashed_password",{
		length: 255
	}).notNull(),
	lastName:varchar("last_name",{
		length:24
	}),
	bio:varchar("bio",{
		length: 244
	}),
	isPrivate: boolean("is_private").default(false),
	profileBackgroundUrl:varchar("profile_background_url").default("https://ikcxvcutdjftdsvbpwsa.supabase.co/storage/v1/object/sign/background-images/default-img.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJiYWNrZ3JvdW5kLWltYWdlcy9kZWZhdWx0LWltZy5wbmciLCJpYXQiOjE3MDc2MDc0NTcsImV4cCI6MTAzNDc1MjEwNTd9.jVcmsigcoSU1nrIv6ci71_VZrpFv0mzTvv6XuW2J_Aw&t=2024-02-10T23%3A24%3A20.028Z").notNull(),
	profilePictureUrl: varchar("profile_pic_url").default("https://ikcxvcutdjftdsvbpwsa.supabase.co/storage/v1/object/sign/profile-images/default-img.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJwcm9maWxlLWltYWdlcy9kZWZhdWx0LWltZy5wbmciLCJpYXQiOjE3MDM0ODg4NjYsImV4cCI6MjAxODg0ODg2Nn0.EeYXUptq697XMxEb5XpbVTtwzm2qwrI2w8cxrD4OySk&t=2023-12-25T07%3A21%3A06.400Z").notNull(),
	postPreference: varchar("post_preference").default("all").notNull(),
});


export const sessionsTable = pgTable("user_session", {
	id: varchar("id", {
		length: 128
	}).primaryKey(),
	userId: varchar("user_id", {
		length: 15
	})
		.notNull()
		.references(() => usersTable.id,{onDelete:"cascade", onUpdate:"cascade"},),
	expiresAt: timestamp("expires_at", {
		withTimezone: true,
		mode: "date"
	}).notNull()
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
		videoUrl: varchar("video_url", {
			length: 255,
	}),
	pictureUrl: varchar("picture_url", {
		length: 255,
}),
	author: varchar("author",{
		length: 24
	}).notNull().references(()=>usersTable.id,{onDelete:"cascade"}),
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
	}).notNull().references(()=>usersTable.id,{onDelete:"cascade"}
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
	}).notNull().references(() => usersTable.id,{onDelete:"cascade"}
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
	}).notNull().references(() => usersTable.id,{onDelete:"cascade"}
	),
	date: timestamp("date")
});


export const userFollowsTable = pgTable("user_follows",{
	id: varchar("id",{
		length: 244
	}).notNull().primaryKey(),
	follower: varchar("follower",{
		length: 15,
	}).notNull().references(()=>usersTable.id,{onDelete:"cascade"}),
	following: varchar("following",{
		length: 15,
	}).notNull().references(()=>usersTable.id,{onDelete:"cascade"})
})

export const notificationsTable = pgTable("notifications",{
	id: varchar("id",{
		length:244,
	}).primaryKey().notNull(),
	sourceUser: varchar("source_user",{
		length: 15
	}).notNull().references(()=> usersTable.id,{onDelete:"cascade", onUpdate:"cascade"},
	),
	targetUser: varchar("target_user",{
		length: 15
	}).notNull().references(()=>
		usersTable.id,{onDelete:"cascade", onUpdate:"cascade"},
	),
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
	read:boolean("read").default(false),
	dateTime: timestamp("date_time")
})

export const groupsTable = pgTable("groups",{
	id: varchar("id",{length:255}).primaryKey(),
	name: varchar("name",{length:15}).notNull(),
	creator: varchar("creator",{length:15}).notNull().references(()=>usersTable.id,{onDelete:"cascade", onUpdate:"cascade"}),
	description:varchar("description",{length: 255})
})

export const groupMembers = pgTable("group_members",{
	id: varchar("id",{length: 255}).primaryKey(),
	group: varchar("group_id",{length:255}).notNull().references(()=>groupsTable.id,{onDelete:"cascade", onUpdate:"cascade"}),
	member: varchar("member_id",{length:15}).notNull().references(()=>usersTable.id,{onDelete:"cascade", onUpdate:"cascade"})
})

export const groupPosts = pgTable("group_posts",{
	id: varchar("id",{length: 255}).primaryKey(),
	group: varchar("group", {length: 255}).references(()=>groupsTable.id,{onDelete:"cascade", onUpdate:"cascade"}),
	post: varchar("post",{length: 255}).references(()=>postsTable.id,{onDelete:"cascade", onUpdate:"cascade"})
})