// src/lib/server/lucia.ts
import { Lucia } from "lucia";
import { dev } from "$app/environment";
import { NodePostgresAdapter, PostgresJsAdapter } from "@lucia-auth/adapter-postgresql";
import postgres from 'pg'
import {DATABASE_URL} from "$env/static/private"
import type { UserType } from "$lib/helpers/types";

const pool = new postgres.Pool({
	connectionString: DATABASE_URL
})

const adapter = new NodePostgresAdapter(pool, {
	// table names
	user: "user",
	session: "user_session"
});

export const auth = new Lucia(adapter,{
	sessionCookie:{
		attributes:{
			secure: !dev	
		}
	},
	getUserAttributes: (data) => {
		return {
			username: data.username,
			profilePictureUrl: data.profilePictureUrl,
			firstName: data.firstName,
			lastName: data.lastName
		};
	}
});

declare module "lucia" {
	interface Register {
		Lucia: typeof Lucia;
		DatabaseUserAttributes: Omit<UserType, "id">;
	}
}


export type Auth = typeof auth;