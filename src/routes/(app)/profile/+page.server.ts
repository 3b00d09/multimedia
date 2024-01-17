import { dbClient } from '$lib/server/db.js';
import { usersTable } from '$lib/server/schema.js';
import { redirect } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';

export const load =  async({locals})=>{
    const session = await locals.auth.validate();

    if(!session){
        throw redirect(302, "/login")
    }

    const _user = await dbClient.select().from(usersTable).where(eq(usersTable.id, session.user.userId))

    const user = _user[0]
    return {
        user
    }
}