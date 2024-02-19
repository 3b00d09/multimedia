import { redirect } from "@sveltejs/kit";

import type { LayoutServerLoad } from "./$types";
import { dbClient } from "$lib/server/db";
import { notificationsTable, usersTable } from "$lib/server/schema";
import { eq } from "drizzle-orm";

export const load: LayoutServerLoad = async (request) => {
  const session = request.locals.session;
  if (session) {
    const user = await dbClient.query.usersTable.findFirst({
      where: eq(usersTable.id, session.userId),
    });

    const notifications = await dbClient
      .select()
      .from(notificationsTable)
      .where(eq(notificationsTable.targetUser, session.userId))
      .leftJoin(usersTable, eq(usersTable.id, notificationsTable.sourceUser));
    return {
      user,
      notifications,
    };
  }
  return {
    user: null,
  };
};
