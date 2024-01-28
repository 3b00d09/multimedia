import { dbClient } from '$lib/server/db.js';
import { commentsTable, postsTable, usersTable } from '$lib/server/schema.js';
import { redirect } from '@sveltejs/kit';
import { eq, ilike } from 'drizzle-orm';

export const load =  async({locals, params})=>{
    
    const username = params.username
    const _user = await dbClient.select().from(usersTable).where(ilike(usersTable.username, username))
    
    const userPosts = await dbClient.select({
        id:postsTable.id,
        author: postsTable.author,
        content: postsTable.content,
        timestamp: postsTable.timestamp,
        imageUrl: usersTable.profilePictureUrl,
    })
        .from(postsTable)
        .where(ilike(postsTable.author, username))
        .leftJoin(usersTable,eq(postsTable.author, usersTable.username))
        .orderBy(postsTable.timestamp)
        .groupBy(postsTable.id, usersTable.id)    

    return {
        userPosts
    }
}