// Import dbClient and tables schema
import { dbClient } from "$lib/server/db.js";
import { postsTable, usersTable } from "$lib/server/schema.js";
import { eq } from "drizzle-orm";

export const load = async ({ locals }) => {
 
  const allPosts = await dbClient
    .select({
      id: postsTable.id,
      author: usersTable.username,
      content: postsTable.content,
      timestamp: postsTable.timestamp,
      imageUrl: usersTable.profilePictureUrl,
    })
    .from(postsTable)
    .leftJoin(usersTable, eq(postsTable.author, usersTable.id))
  
 
  const allUsers = await dbClient
    .select({
      username: usersTable.username,
      imageUrl: usersTable.profilePictureUrl,
      bio:usersTable.bio,
      backgroungimg:usersTable.profileBackgroundUrl
    })
    .from(usersTable)
    

  return {
    allPosts,
    allUsers,
  };
};
