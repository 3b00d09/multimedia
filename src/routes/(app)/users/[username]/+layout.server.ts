import { dbClient } from '$lib/server/db.js';
import { commentsTable, postsTable, userFollowsTable, usersTable } from '$lib/server/schema.js';
import { redirect } from '@sveltejs/kit';
import { count, eq, ilike, and } from 'drizzle-orm';

export const load = async(request) => {
    let following = false;
    let allowViewing = true; 
    const session = request.locals.session;
    
    if (!session) {
       
        throw redirect(301, "/login");
    }

    const username = request.params.username;

    const userResult = await dbClient.select().from(usersTable).where(ilike(usersTable.username, username))

    if (userResult.length === 0) {
       
        throw redirect(301, "/not-found");
    }

    const user = userResult[0]; 
    const isProfileOwner = session.userId === user.id; 

    if (user.isPrivate && !isProfileOwner) {
       
        const followersResult = await dbClient
            .select()
            .from(userFollowsTable)
            .where(and(eq(userFollowsTable.follower, session.userId), eq(userFollowsTable.following, user.id)))
           
            const existingFollow = await dbClient
            .select()
            .from(userFollowsTable)
            .where(and(eq(userFollowsTable.follower, session.userId), eq(userFollowsTable.following, user.id)))
            following = followersResult.length > 0;

    
        allowViewing = following;
    }

    let postsCount = 0;
    let followerCount = 0;
    let followingCount = 0;

    if (allowViewing) {
        const postsCountResult = await dbClient.select({value:count(postsTable.id)}).from(postsTable).where(eq(postsTable.author, user.id));
        postsCount = postsCountResult[0].value ?? 0;

        const followerCountResult = await dbClient.select({value:count(userFollowsTable.id)}).from(userFollowsTable).where(eq(userFollowsTable.following, user.id));
        console.log(followerCountResult)
        followerCount = followerCountResult[0].value ?? 0;

        const followingCountResult = await dbClient.select({value:count(userFollowsTable.id)}).from(userFollowsTable).where(eq(userFollowsTable.follower, user.id));
        followingCount = followingCountResult[0].value ?? 0;

        console.log("user profile are private and u are followed")
        console.log(followingCount)
        console.log(followerCount)
        console.log(postsCountResult)

    }else {

        postsCount = 0;
        followerCount = 0;
        followingCount = 0;
    }


    return {
        user: user,
        postsCount,
        followerCount,
        followingCount,
        personalProfile: isProfileOwner,
        following,
        allowViewing
    };
};

