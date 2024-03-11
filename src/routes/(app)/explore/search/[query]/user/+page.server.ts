import { dbClient } from "$lib/server/db.js";
import {  usersTable } from "$lib/server/schema.js";
import { ilike, eq } from "drizzle-orm";

export async function load({ url,params }) {
  const searchQuery = params.query;

  if (!searchQuery) {
    throw new Error("Search query is required");
  }

  const allUsers = await dbClient.select({
    username:usersTable.username,
     imageUrl: usersTable.profilePictureUrl, 
     bio:usersTable.bio,
     backgroungimg:usersTable.profileBackgroundUrl,
     firstName:usersTable.firstName,
     lastName:usersTable.lastName,
 })
     .from(usersTable)
 
    .where(ilike(usersTable.username, `%${searchQuery}%`));

  return {
 
    allUsers,
  };
}
