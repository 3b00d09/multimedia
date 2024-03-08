import type { commentsTable, postsTable, usersTable,likesPostTable, notificationsTable } from '../server/schema';

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
    firstName?: string;
    lastName?: string;
  }

export type PostWithProfile = {
    post:PostType &
    {
        likeCount: number,
        commentCount: number
    }, 
    author: UserType,
}

export type CommentWithProfile = {
    comment: CommentType &
    {
        likeCount: number,
        replyCount: number
    },
    author: UserType
}

export type CommentWithProfileImage = CommentType &{
    author: string,
    imageUrl: string | null,
    firstName: string | null,
    lastName: string | null
}
  export type ToastArgs = {
    active:boolean,
    status: "error" | "success" | "info" | "pending",
    message: string;
  }

export type AggregatedPost = { post: typeof postsTable.$inferInsert; comments: typeof commentsTable.$inferInsert[] }