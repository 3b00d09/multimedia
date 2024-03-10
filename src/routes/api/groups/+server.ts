import { dbClient } from '$lib/server/db.js'
import { groupMembers, groupPosts, groupsTable } from '$lib/server/schema.js'
import { json } from '@sveltejs/kit'
import { eq } from 'drizzle-orm'
import { v4 as uuidv4 } from "uuid";

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

export const POST = async(request)=>{
    const session = request.locals.session

    if(!session) return json({error: true, message: "User not authenticated"})

    const data = await request.request.json()
    const {groupId, postId} = data
    const group = await dbClient.select().from(groupsTable).where((eq(groupsTable.id, groupId)))
    if(group.length === 0) return json({error: true, message: "Group doesn't exist"})
    const members = await dbClient.select().from(groupMembers).where((eq(groupMembers.member, session.userId)))

    if(members.length === 0) return json({error: true, message: "Not a member of this group"})

    try{
        await dbClient.insert(groupPosts).values({
            id: uuidv4(),
            group: group[0].id,
            post: postId
        })
        return json({success: true, message:"Post sent."})
    }
    catch(e){
        return json({error: true, message:"Failed to share post."})
    }
}