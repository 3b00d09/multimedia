import { dbClient } from '$lib/server/db.js';
import { commentsTable, postsTable, usersTable } from '$lib/server/schema.js';
import { redirect } from '@sveltejs/kit';
import { eq, and, isNull } from 'drizzle-orm';

export const load =  async({locals})=>{
    const session = await locals.auth.validate();

    if(!session){
        throw redirect(302, "/login")
    }
           
    const userComments = await dbClient
    .select()
    .from(commentsTable)
    .where
    (
        and(
            eq(commentsTable.author, "Diyara"),
            isNull(commentsTable.parentCommentId)
        )
    )
    .leftJoin(postsTable, eq(postsTable.id, commentsTable.post))

    console.log(userComments)

    return {
        userComments
    }
}