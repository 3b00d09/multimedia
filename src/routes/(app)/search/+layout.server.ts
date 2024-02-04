// Import dbClient and tables schema
import { dbClient } from "$lib/server/db.js";
import { postsTable, usersTable } from "$lib/server/schema.js";
import { eq } from "drizzle-orm";

export const load = async ({ locals }) => {
 
  const allPosts = await dbClient
    .select({
      id: postsTable.id,
      author: postsTable.author,
      content: postsTable.content,
      timestamp: postsTable.timestamp,
      imageUrl: usersTable.profilePictureUrl,
    })
    .from(postsTable)
    .leftJoin(usersTable, eq(postsTable.author, usersTable.username))
  
 
  const allUsers = await dbClient
    .select({
      username: usersTable.username,
      imageUrl: usersTable.profilePictureUrl,
    })
    .from(usersTable)
    

  return {
    allPosts,
    allUsers,
  };
};
