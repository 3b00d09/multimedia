import type { commentsTable, postsTable } from './server/schema';
import type { User } from 'lucia';

export type postType = typeof postsTable.$inferSelect

export type AggregatedPost = { post: typeof postsTable.$inferInsert; comments: typeof commentsTable.$inferInsert[] }