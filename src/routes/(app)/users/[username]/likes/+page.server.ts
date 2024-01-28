import { dbClient } from '$lib/server/db.js';
import { likesPostTable, postsTable, usersTable } from '$lib/server/schema.js';
import { redirect } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';

export const load =  async({locals})=>{
    const session = await locals.auth.validate();

    if(!session){
        throw redirect(302, "/login")
    }

    const userLikes = await dbClient.select({
        id:postsTable.id,
        author: postsTable.author,
        content: postsTable.content,
        timestamp: postsTable.timestamp,
        imageUrl: usersTable.profilePictureUrl,
    })
        .from(postsTable)
        .leftJoin(likesPostTable,eq(likesPostTable.post, postsTable.id))
        .leftJoin(usersTable,eq(postsTable.author,usersTable.username))
        .where(eq(likesPostTable.author, session.user.username))
        .orderBy(postsTable.timestamp) 
        
    return {
        userLikes
    }
}