import { queryPost } from "$lib/helpers/data/posts.js";
import { dbClient } from "$lib/server/db.js";
import { postsTable, usersTable } from "$lib/server/schema.js";
import { ilike, eq } from "drizzle-orm";

export async function load({ url,params }) {
  const searchQuery = params.query;

  if (!searchQuery) {
    throw new Error("Search query is required");
  }

  const allPosts = await queryPost(searchQuery)


  return {
    allPosts,
  
  };
}
