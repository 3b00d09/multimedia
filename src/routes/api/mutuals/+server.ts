import { dbClient } from '$lib/server/db.js'
import { userFollowsTable, usersTable } from '$lib/server/schema.js'
import { json } from '@sveltejs/kit'
import { and, eq, getTableColumns } from 'drizzle-orm'

export const GET = async(request)=>{
    const session = request.locals.session
    if(!session) return json({error: true, message: "User not authenticated"})

    const followSubquery = dbClient.select().from(userFollowsTable).where(eq(userFollowsTable.follower, session.userId)).as("followSubquery")
    
    const { password, ...rest } = getTableColumns(usersTable);
    const mutuals = await dbClient.select({...rest}).from(userFollowsTable).where(eq(userFollowsTable.following, session.userId)).leftJoin(followSubquery, eq(userFollowsTable.follower, session.userId))
    .leftJoin(usersTable, eq(usersTable.id, userFollowsTable.follower))

    return json({success: true, data: mutuals})
}