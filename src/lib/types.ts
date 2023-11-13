import type { postsTable } from './server/schema';
import type { User } from 'lucia';

export type postType = typeof postsTable.$inferSelect
