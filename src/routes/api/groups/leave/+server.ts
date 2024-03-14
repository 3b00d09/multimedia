import { dbClient } from '$lib/server/db'
import { groupMembers } from '$lib/server/schema.js'
import { json } from '@sveltejs/kit'
import { and, eq } from 'drizzle-orm'

export const DELETE = async(request) =>{
    const session = request.locals.session

    if(!session){
        return json({error:true, message: "User not authenticated"})
    }

    const groupId = request.url.searchParams.get("id")
    
    if(!groupId){
        return json({error: true, message: "Missing search params"})
    }

    try{
        await dbClient.delete(groupMembers).where(
            and(
                eq(groupMembers.member, session.userId),
                eq(groupMembers.group, groupId)
            )
        )

        return json({success: true, message: "Group deleted successfully."})
    }

    catch(e){
        return json({error: true, message: "Unable to exit group. Please try again later."})
    }
}