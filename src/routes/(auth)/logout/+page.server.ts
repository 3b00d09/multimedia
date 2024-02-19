import { auth } from '$lib/server/lucia';
import { fail, redirect } from '@sveltejs/kit';

import type { PageServerLoad, Actions } from './$types';

export const load: PageServerLoad = async (request) => {


	if (!request.locals.session) {
        return fail(401);
    }
    await auth.invalidateSession(request.locals.session.id);
    const sessionCookie = auth.createBlankSessionCookie();
    request.cookies.set(sessionCookie.name, sessionCookie.value, {
        path: ".",
        ...sessionCookie.attributes
    });
    throw redirect(302, "/login");
};
  
