import { dbClient } from "$lib/server/db.js";
import { postsTable, usersTable } from "$lib/server/schema.js";
import { ilike, eq } from "drizzle-orm";

export async function load({ url }) {
  const searchQuery = url.searchParams.get("q");

  if (!searchQuery) {
    throw new Error("Search query is required");
  }

  const allPosts = dbClient
    .select({
      id: postsTable.id,
      author: postsTable.author,
      content: postsTable.content,
      timestamp: postsTable.timestamp,
      imageUrl: usersTable.profilePictureUrl,
    })
    .from(postsTable)
    .leftJoin(usersTable, eq(postsTable.author, usersTable.username))
    .where(ilike(postsTable.content, `%${searchQuery}%`));

  const allUsers = dbClient
    .select({
      username: usersTable.username,
      imageUrl: usersTable.profilePictureUrl,
      bio: usersTable.bio,
    })
    .from(usersTable)
    .where(ilike(usersTable.username, `%${searchQuery}%`));

  return {
    allPosts,
    allUsers,
  };
}
