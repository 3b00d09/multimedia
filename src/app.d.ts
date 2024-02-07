// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
/// <reference types="lucia" />
declare global {
	namespace App {
		interface Locals {
			auth: import("lucia").AuthRequest;
		}
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface Platform {}
	}
	namespace Lucia {
		type Auth = import("$lib/server/lucia").Auth;
		type DatabaseUserAttributes = {
			username: string;
			profilePictureUrl?: string;
			firstName?: string,
			lastName? :string,
		};
		type DatabaseSessionAttributes = {};
	}
}


export {};
