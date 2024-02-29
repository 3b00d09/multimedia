import { dbClient } from "$lib/server/db";
import { usersTable } from "$lib/server/schema";
import { json, redirect } from "@sveltejs/kit";
import { eq } from "drizzle-orm";

export const GET = async ({ url }) => {
  const searchQuery = url.searchParams.get("search-query");

  if (searchQuery) {
    const lowerCaseSearchQuery = searchQuery.toLowerCase();

    const allUsers = await dbClient
      .select({
        username: usersTable.username,
        profilePictureUrl: usersTable.profilePictureUrl,
      })
      .from(usersTable)
      .execute();

    const matchingUsers = allUsers.filter((user) =>
      user.username.toLowerCase().includes(lowerCaseSearchQuery)
    );

    return json(matchingUsers);
  } else {
    const allUsers = await dbClient.select().from(usersTable).execute();

    return json(allUsers);
  }
};
export async function POST(request) {
  const session = request.locals.session;
  if (!session) throw redirect(301, "/login");

  const body = await request.request.json();
  const { username, firstName, lastName, bio } = body;

  interface UpdateFields {
    username?: string;
    firstName?: string;
    lastName?: string;
    bio?: string
  }

  let updateFields: UpdateFields = {};
  if (username) updateFields.username = username;
  if (firstName) updateFields.firstName = firstName;
  if (lastName) updateFields.lastName = lastName;
  if(bio) updateFields.bio = bio;

  if (Object.keys(updateFields).length > 0) {
    await dbClient
      .update(usersTable)
      .set(updateFields)
      .where(eq(usersTable.id, session.userId))
      .execute();

    return json({ success: true, message: "User information updated." });
  }
}
export async function DELETE(request) {
  const session = request.locals.session;
  if (!session) throw redirect(301, "/login");


  const row = await dbClient
    .delete(usersTable)
    .where(eq(usersTable.id, session.userId));
  return json({ success: true, message: "user are deleted" });
}
