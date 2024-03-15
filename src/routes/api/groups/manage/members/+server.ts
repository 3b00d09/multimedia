import { dbClient } from "$lib/server/db.js"
import { groupMembers } from "$lib/server/schema.js"
import { json } from "@sveltejs/kit"
import { and, eq } from "drizzle-orm"
import { v4 as uuidv4 } from "uuid";

// return if you are a member of a group or not
export const GET = async(request) =>{
    const session = request.locals.session

    if(!session) return json({error: true, message: "User not authenticated"})
    const groupId = request.url.searchParams.get("groupId")
    const userId = request.url.searchParams.get("user")

    if(!groupId || !userId) return json({error: true, message: "Missing search params"})


    const group = await dbClient.select().from(groupMembers).where(
        and(
            eq(groupMembers.member, userId),
            eq(groupMembers.group, groupId)
        )
    )

    return json({success: true, isMember: group.length > 0})
}

// add member to group
export const POST = async(request)=>{
    const session = request.locals.session
    if(!session) return json({error: true, message: "User not authenticated"})

    const {groupId, userId} = await request.request.json()

    if(!groupId || !userId) return json({error: true, message: "Missing data"})

    try{
        await dbClient.insert(groupMembers).values({
            id: uuidv4(),
            group: groupId,
            member: userId
        })

        return json({success: true, message: "Member added successfully."})
    }
    catch(e){
        return json({error: true, message: "Unable to add user. Please try again."})
    }
}

// remove member from group
export const DELETE = async(request) =>{
    const session = request.locals.session
    if(!session) return json({error: true, message: "User not authenticated"})

    const groupId = request.url.searchParams.get("groupId")
    const userId = request.url.searchParams.get("userId")

    if(!groupId || !userId) return json({error: true, message: "Missing search params"})

    try{
        await dbClient.delete(groupMembers).where(
            and(
                eq(
                    groupMembers.group, groupId
                ),
                eq(
                    groupMembers.member, userId
                )
            )
        )

        return json({success: true, message: "Member removed successfully."})
    }
    catch(e){
        return json({error: true, message: "Unable to remove user. Please try again."})
    }
}