import { auth } from "$lib/server/lucia";
import { fail, redirect } from "@sveltejs/kit";
import { Argon2id } from "oslo/password";
import type { Actions } from "./$types";

import { dbClient } from "$lib/server/db";
import { usersTable } from "$lib/server/schema";
import { ilike } from "drizzle-orm";

export const actions: Actions = {
  default: async (request) => {
    const formData = await request.request.formData();
    const username = formData.get("username");
    const password = formData.get("password");
    // basic check
    if (
      typeof username !== "string" ||
      username.length < 1 ||
      username.length > 31
    ) {
      return fail(400, {
        message: "Invalid username",
      });
    }
    if (
      typeof password !== "string" ||
      password.length < 1 ||
      password.length > 255
    ) {
      return fail(400, {
        message: "Invalid password",
      });
    }

    const existingUser = await dbClient
		.query.usersTable.findFirst({ where: ilike(usersTable.username,username)})
  

    if (!existingUser) {
      return fail(400, {
        message: "Incorrect username or password",
      });
    }

    const validPassword = await new Argon2id().verify(
      existingUser.password,
      password
    );

    if (!validPassword) {
      return fail(400, {
        message: "Incorrect username or password",
      });
    }

    const session = await auth.createSession(existingUser.id, {});
    const sessionCookie = auth.createSessionCookie(session.id);
    request.cookies.set(sessionCookie.name, sessionCookie.value, {
      path: ".",
      ...sessionCookie.attributes,
    });
    // redirect to
    // make sure you don't throw inside a try/catch block!
    throw redirect(302, "/");
  },
};
