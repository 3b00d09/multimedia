import { dbClient } from "$lib/server/db";
import { usersTable } from "$lib/server/schema";
import { json } from "@sveltejs/kit";

export const GET = async ({ url }) => {
  const searchQuery = url.searchParams.get("search-query");

  if (searchQuery) {
    const lowerCaseSearchQuery = searchQuery.toLowerCase();

    const allUsers = await dbClient.select().from(usersTable).execute();

    const matchingUsers = allUsers.filter((user) =>
      user.username.toLowerCase().includes(lowerCaseSearchQuery)
    );

    return json(matchingUsers);
  } else {
    const allUsers = await dbClient.select().from(usersTable).execute();

    return json(allUsers);
  }
};
