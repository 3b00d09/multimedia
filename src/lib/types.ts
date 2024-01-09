import type { commentsTable, postsTable, usersTable } from './server/schema';

export type UserType = typeof usersTable.$inferSelect
export type CommentType = typeof commentsTable.$inferSelect
export type PostType = typeof postsTable.$inferSelect
export type PostWithProfileImage = PostType &{
    imageUrl: string | null
}
export type PostWithCommentCount = PostType & {
    commentCount?: number;
    imageUrl: string | null
}

export type CommentWithProfileImage = CommentType &{
    imageUrl: string | null
}

export type AggregatedPost = { post: typeof postsTable.$inferInsert; comments: typeof commentsTable.$inferInsert[] }