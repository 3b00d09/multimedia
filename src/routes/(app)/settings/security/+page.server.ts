import type { Actions } from "./$types";
import { dbClient } from "$lib/server/db";
import { usersTable } from "$lib/server/schema";
import { eq } from "drizzle-orm";
import { redirect, fail, json } from "@sveltejs/kit";

export const actions: Actions = {
  makePrivate: async ( request ) => {
    const session = request.locals.session;
    if (!session) {
      throw redirect(307, '/login');
    }

    await dbClient
      .update(usersTable)
      .set({ isPrivate: true })
      .where(eq(usersTable.id, session.userId))
      .execute();

      return {
        success: true,
        message: "Your account is now Private"
      }
  },
  makePublic: async ( request ) => {
    const session = request.locals.session;
    if (!session) {
      throw redirect(307, '/login');
    }

    await dbClient
      .update(usersTable)
      .set({ isPrivate: false })
      .where(eq(usersTable.id, session.userId))
      .execute();

      return {
        success: true,
        message: "Your account is now public"
      }
  },

};
