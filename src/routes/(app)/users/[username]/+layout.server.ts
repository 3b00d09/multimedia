import { dbClient } from '$lib/server/db.js';
import { auth } from '$lib/server/lucia';
import { commentsTable, postsTable, userFollowsTable, usersTable } from '$lib/server/schema.js';
import { redirect } from '@sveltejs/kit';
import { count, eq, ilike, and } from 'drizzle-orm';

export const load =  async({locals, params})=>{

    let following: boolean = false;

    const session = await locals.auth.validate()

    const username = params.username
    
    // using ilike for case insensitive search
    const _user = await dbClient.select().from(usersTable).where(ilike(usersTable.username, username))

    if(_user.length === 0){
        throw redirect(301, "/")
    }
    const postsCount = await dbClient.select({value:count(postsTable.id)}).from(postsTable).where(eq(postsTable.author, username))
    const followerCount = await dbClient.select({value:count(userFollowsTable.id)}).from(userFollowsTable).where(ilike(userFollowsTable.following, username))
    const followingCount = await dbClient.select({value:count(userFollowsTable.id)}).from(userFollowsTable).where(ilike(userFollowsTable.follower, username))
    

    if(session){
        const followers = await dbClient.
        select()
        .from(userFollowsTable)
        .where(
            and(
                ilike(userFollowsTable.follower, session.user.username),
                ilike(userFollowsTable.following, username)
            )
        )

        following = followers.length > 0
    }

    const user = _user[0]
    return {
        user, 
        postsCount: postsCount[0].value,
        followerCount: followerCount[0].value,
        followingCount: followingCount[0].value, 
        personalProfile: session?.user.username === user.username, 
        following
    }
}