import type { commentsTable, postsTable, usersTable,likesPostTable, notificationsTable } from './server/schema';

export type UserType = typeof usersTable.$inferSelect
export type NotificationType = {
    notifications: typeof notificationsTable.$inferSelect,
    user: UserType | null
}
export type CommentType = typeof commentsTable.$inferSelect
export type LikePost = typeof likesPostTable.$inferSelect
export type PostType = typeof postsTable.$inferSelect
export interface User {
    username: string;
    imageUrl: string;
  }
  
export type PostWithProfile = PostType &{
    author: string,
    imageUrl: string | null,
    firstName: string | null,
    lastName: string | null
}

export type CommentWithProfileImage = CommentType &{
    author: string,
    imageUrl: string | null,
    firstName: string | null,
    lastName: string | null
}

export type AggregatedPost = { post: typeof postsTable.$inferInsert; comments: typeof commentsTable.$inferInsert[] }