// src/lib/server/lucia.ts
import { lucia } from "lucia";
import { sveltekit } from "lucia/middleware";
import { dev } from "$app/environment";
import { pg } from "@lucia-auth/adapter-postgresql";
import postgres from 'pg'
import {DATABASE_URL} from "$env/static/private"

const pool = new postgres.Pool({
	connectionString: DATABASE_URL
})

export const auth = lucia({
	adapter: pg(pool, {
		user: "user",
		key: "user_key",
		session: "user_session"
	}),
	env: dev ? "DEV" : "PROD",
	middleware: sveltekit(),

	getUserAttributes: (data) => {
		return {
			username: data.username
		};
	}
});


export type Auth = typeof auth;