import { dbClient } from '$lib/server/db.js'
import { groupMembers, groupPosts, groupsTable } from '$lib/server/schema.js'
import { json } from '@sveltejs/kit'
import { eq, getTableColumns } from 'drizzle-orm'

// get all groups you are a member of
export const GET = async(request)=>{
    const session = request.locals.session

    if(!session){
        return json({error:true, message: "User not authenticated"})
    }

     const groups = await dbClient.select({...getTableColumns(groupsTable)}).from(groupsTable).leftJoin(groupMembers, eq(groupMembers.group, groupsTable.id)).where(eq(groupMembers.member, session.userId))
     return json(groups)
}