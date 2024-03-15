import { dbClient } from '$lib/server/db.js'
import {groupsTable } from '$lib/server/schema.js'
import { json } from '@sveltejs/kit'
import { eq} from 'drizzle-orm'


// delete group you created
export const DELETE = async(request) =>{
    const session = request.locals.session

    if(!session){
        return json({error:true, message: "User not authenticated"})
    }

    const groupId = request.url.searchParams.get("id")
    
    if(!groupId){
        return json({error: true, message: "Missing search params"})
    }

    const group = await dbClient.select().from(groupsTable).where(eq(groupsTable.id, groupId))

    if(group.length === 0){
        return json({error: true, message: "Invalid Group"})
    }

    const groupOwner = group[0].creator

    if(groupOwner !== session.userId){
        return json({error: true, message: "Unauthorized Request"})
    }

    await dbClient.delete(groupsTable).where(eq(groupsTable.id, groupId))

    return json({success: true, message: "Group deleted successfully."})
}