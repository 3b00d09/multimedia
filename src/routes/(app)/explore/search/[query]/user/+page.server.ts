import { dbClient } from "$lib/server/db.js";
import { commentsTable, postsTable, userFollowsTable, usersTable } from '$lib/server/schema.js';
import { count, eq, ilike, and } from 'drizzle-orm';
export async function load({ request,params }) {
  const searchQuery = params.query;
  const username = request.params.username
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

       const Followers = await dbClient.select()  .from(userFollowsTable)
       .where(
           and(
               eq(userFollowsTable.follower, session.userId),
               eq(userFollowsTable.following, _user[0].id)
           )
       )
  return {
 
    allUsers,
  };
}
