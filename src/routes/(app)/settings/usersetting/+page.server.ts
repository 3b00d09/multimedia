import { auth } from "$lib/server/lucia";
import { redirect, fail, json } from "@sveltejs/kit";
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
    const repeatNewPassword = formData.get("repeat-new-password") as string;

    if(newPassword !== repeatNewPassword){
      return {error: true, message: "New password repeated incorrectly."}
    }

    const session = request.locals.session;
    if (!session){
      return {error: true, message: "Invalid user"}
    }

    const existingUser = await dbClient
      .query.usersTable.findFirst({ where: ilike(usersTable.id, session.userId) });

    if (!existingUser) {
      return {error: true, message:"Invalid User."};
    }


    const validPassword = await new Argon2id().verify(
      existingUser.password as string,
      currentPassword
    );

    if (!validPassword) {
      return {error: true, message:"Incorrect current password."};
    }

    const hashedNewPassword = await new Argon2id().hash(newPassword);

    await dbClient
      .update(usersTable)
      .set({ password: hashedNewPassword })
      .where(eq(usersTable.id, session.userId));

    return {
      success: true,
      message: "Password changed successfully"
    }
  },
};
