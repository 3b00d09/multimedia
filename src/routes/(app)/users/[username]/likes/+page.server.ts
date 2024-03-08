import { getLikedPosts } from '$lib/helpers/data/posts.js';
import { dbClient } from '$lib/server/db.js';
import { likesPostTable, postsTable, usersTable } from '$lib/server/schema.js';
import { error, redirect } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';

export const load =  async(request)=>{
    const session = request.locals.session
    if(!session) throw redirect(301, "/")
    

    const user = await dbClient.select().from(usersTable).where(eq(usersTable.id, session.userId))

    if(!user){
        throw error(500, "No user found")
    }

    const userLikes = await getLikedPosts(user[0].id)
        
    return {
        userLikes
    }
}