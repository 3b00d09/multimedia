import { dbClient } from '$lib/server/db.js';
import { commentsTable, postsTable, usersTable } from '$lib/server/schema.js';
import { redirect } from '@sveltejs/kit';
import { eq, and, isNull } from 'drizzle-orm';

export const load =  async({params})=>{
    const username = params.username
           
    const userComments = await dbClient
    .select()
    .from(commentsTable)
    .where
    (
        and(
            eq(commentsTable.author, username),
            isNull(commentsTable.parentCommentId)
        )
    )
    .leftJoin(postsTable, eq(postsTable.id, commentsTable.post))

    console.log(userComments)

    return {
        userComments
    }
}