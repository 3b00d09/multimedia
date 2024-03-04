// routes/signup/+page.server.ts
import { auth } from "$lib/server/lucia";
import { fail, redirect } from "@sveltejs/kit";
import { Lucia, generateId } from "lucia";
import { Argon2id } from "oslo/password";
import { v4 as uuidv4 } from "uuid";

import type { Actions } from "./$types";
import { dbClient } from "$lib/server/db";
import { usersTable } from "$lib/server/schema";


export const actions:Actions = {
	default: async (request) => {
		const formData = await request.request.formData();
		const username = formData.get("username");
		const password = formData.get("password");
		// basic check
		if (
			typeof username !== "string" ||
			username.length < 4 ||
			username.length > 31
		) {
			return fail(400, {
				message: "Invalid username"
			});
		}
		if (
			typeof password !== "string"
		) {
			return fail(400, {
				message: "Invalid password"
			});
		}
		const userId = generateId(15)
		const hashedPassword = await new Argon2id().hash(password)

		const newUser = await dbClient.insert(usersTable).values({
			id: userId,
			username: username,
			password: hashedPassword
		})

		const session = await auth.createSession(userId, {})
		const sessionCookie = auth.createSessionCookie(session.id)
		request.cookies.set(sessionCookie.name, sessionCookie.value, {
			path: ".",
			...sessionCookie.attributes
		});
		// redirect to
		// make sure you don't throw inside a try/catch block!
		throw redirect(302, "/welcome");
	}
};