import { dbClient } from "$lib/server/db.js";
import { postsTable, usersTable } from "$lib/server/schema.js";
import { ilike, eq } from "drizzle-orm";

export async function load({ url,params }) {
  const searchQuery = params.query;

  if (!searchQuery) {
    throw new Error("Search query is required");
  }

  const allPosts = dbClient
    .select({
      id: postsTable.id,
      author: usersTable.username,
      content: postsTable.content,
      timestamp: postsTable.timestamp,
      imageUrl: usersTable.profilePictureUrl,
    })
    .from(postsTable)
    .leftJoin(usersTable, eq(postsTable.author, usersTable.id))
    .where(ilike(postsTable.content, `%${searchQuery}%`));


  return {
    allPosts,
  
  };
}
