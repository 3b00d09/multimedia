import type { InferModel } from 'drizzle-orm';
import type { postsTable } from './server/schema';
import type { User } from 'lucia';

export type postType = typeof postsTable.$inferSelect

export type postReplies = {
    comment: string,
    user: User,
    likes: number
}