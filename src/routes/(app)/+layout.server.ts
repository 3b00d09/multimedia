import { redirect } from "@sveltejs/kit";

import type { LayoutServerLoad } from "./$types";
import { dbClient } from "$lib/server/db";
import { groupMembers, groupsTable, notificationsTable, usersTable } from "$lib/server/schema";
import { asc, eq, getTableColumns } from "drizzle-orm";

export const load: LayoutServerLoad = async (request) => {

  let groups: typeof groupsTable.$inferSelect[] = []
  
  const session = request.locals.session;
  if (session) {
    const user = await dbClient.query.usersTable.findFirst({
      where: eq(usersTable.id, session.userId),
    });

    const {password, ...rest} = getTableColumns(usersTable)
    const notifications = await dbClient
      .select({
        notification: getTableColumns(notificationsTable),
        user: {...rest}
      })
      .from(notificationsTable)
      .where(eq(notificationsTable.targetUser, session.userId))
      .leftJoin(usersTable, eq(usersTable.id, notificationsTable.sourceUser))
      .orderBy(asc(notificationsTable.dateTime))
      .limit(5);

    groups = await dbClient.select({...getTableColumns(groupsTable)}).from(groupsTable).leftJoin(groupMembers, eq(groupMembers.group, groupsTable.id)).where(eq(groupMembers.member, session.userId))
    return {
      user,
      notifications,
      groups
    };
  }
  return {
    user: null,
    groups
  };
};
