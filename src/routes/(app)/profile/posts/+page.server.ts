import { dbClient } from '$lib/server/db.js';
import { commentsTable, postsTable, usersTable } from '$lib/server/schema.js';
import { redirect } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';

export const load =  async({locals})=>{
    const session = await locals.auth.validate();

    if(!session){
        throw redirect(302, "/login")
    }

    const _user = await dbClient.select().from(usersTable).where(eq(usersTable.id, session.user.userId))
    
    const userPosts = await dbClient.select({
        id:postsTable.id,
        author: postsTable.author,
        content: postsTable.content,
        timestamp: postsTable.timestamp,
        imageUrl: usersTable.profilePictureUrl,
    })
        .from(postsTable)
        .where(eq(postsTable.author, session.user.username))
        .leftJoin(usersTable,eq(postsTable.author, usersTable.username))
        .orderBy(postsTable.timestamp)
        .groupBy(postsTable.id, usersTable.id)    

    return {
        userPosts
    }
}