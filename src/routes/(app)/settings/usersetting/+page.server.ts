import { auth } from "$lib/server/lucia";
import { redirect, fail } from "@sveltejs/kit";
import { Argon2id } from "oslo/password";
import type { Actions } from "./$types";

import { dbClient } from "$lib/server/db";
import { usersTable } from "$lib/server/schema";
import { eq, ilike } from "drizzle-orm";

export const actions:Actions = {
  changePassword: async (request) => {
    const formData = await request.request.formData();
 
    const currentPassword = formData.get("password") as string;
    const newPassword = formData.get("new-password") as string;

    const session = request.locals.session;
    if (!session) throw redirect(301, "/login");

    const existingUser = await dbClient
      .query.usersTable.findFirst({ where: ilike(usersTable.id, session.userId) });

    if (!existingUser) {
      return fail(400, { message: "User not found." });
    }


    const validPassword = await new Argon2id().verify(
      existingUser.password as string,
      currentPassword
    );

    if (!validPassword) {
      return fail(400, { message: "Incorrect current password." });
    }

    const hashedNewPassword = await new Argon2id().hash(newPassword);

    await dbClient
      .update(usersTable)
      .set({ password: hashedNewPassword })
      .where(eq(usersTable.id, session.userId));

    return{
      success: true
    }
  },
};
