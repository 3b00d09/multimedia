import { getPosts } from "$lib/helpers/data/posts.js";
import { dbClient } from "$lib/server/db.js";
import { postsTable, usersTable } from "$lib/server/schema.js";
import { eq } from "drizzle-orm";

export const load = async ({ locals }) => {
  const allPosts = await getPosts()

  return {
    allPosts,
  };
};
