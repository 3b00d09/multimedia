import { dbClient } from "$lib/server/db";
import { usersTable } from "$lib/server/schema";
import { json } from "@sveltejs/kit";
import { auth } from "$lib/server/lucia.js";
import { eq,and } from "drizzle-orm";

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
  const authRequest = auth.handleRequest(request);
  const session = await authRequest.validate();

  if (!session?.user) {
    return json({ success: false, message: "User is not authenticated" });
  }

  const body = await request.request.json();
  const { firstName,lastName,username } = body;


  const newusername = await dbClient
    .update(usersTable)
    .set({ firstName, lastName,username })
    .where(eq(usersTable.id, session.user.userId));
  console.log(newusername);

  return json({ newusername, success: true, message: "Username has changed." });
}


export async function DELETE(request) {
  const authRequest = auth.handleRequest(request);
  const session = await authRequest.validate();

  if (!session?.user) {
    return json({ success: false, message: "User is not authenticated" });
  
  }
 
  const row = await dbClient.delete(usersTable).where(eq(usersTable.id, session.user.userId));
  return json({ success: true,message: "user are deleted"});
}