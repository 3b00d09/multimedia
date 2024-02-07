import type { commentsTable, postsTable, usersTable,likesPostTable } from './server/schema';

export type UserType = typeof usersTable.$inferSelect
export type CommentType = typeof commentsTable.$inferSelect
export type LikePost = typeof likesPostTable.$inferSelect
export type PostType = typeof postsTable.$inferSelect
export interface User {
    username: string;
    imageUrl: string;
  }
  
export type PostWithProfileImage = PostType &{
    imageUrl: string | null,
    firstName: string | null,
    lastName: string | null
}

export type CommentWithProfileImage = CommentType &{
    imageUrl: string | null
}

export type AggregatedPost = { post: typeof postsTable.$inferInsert; comments: typeof commentsTable.$inferInsert[] }