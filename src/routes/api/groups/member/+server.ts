import { dbClient } from "$lib/server/db.js"
import { groupMembers } from "$lib/server/schema.js"
import { json } from "@sveltejs/kit"
import { and, eq } from "drizzle-orm"

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