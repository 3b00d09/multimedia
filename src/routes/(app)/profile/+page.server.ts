import { dbClient } from '$lib/server/db.js';
import { postsTable, usersTable } from '$lib/server/schema.js';
import { redirect } from '@sveltejs/kit';
import { count, eq } from 'drizzle-orm';

export const load =  async({locals})=>{
    const session = await locals.auth.validate();

    if(!session){
        throw redirect(302, "/login")
    }

    const _user = await dbClient.select().from(usersTable).where(eq(usersTable.id, session.user.userId))
    const postsCount = await dbClient.select({value:count(postsTable.id)}).from(postsTable).where(eq(postsTable.author, session.user.username))

    const user = _user[0]
    return {
        user,postsCount: postsCount[0].value
    }
}