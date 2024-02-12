import { dbClient } from "$lib/server/db"
import { likesPostTable, postsTable, usersTable } from "$lib/server/schema"
import { json } from "@sveltejs/kit"
import { eq, getTableColumns } from "drizzle-orm"

export const GET = async({url}) =>{
    
    const postId = url.searchParams.get("post")

    if(!postId){
        return json({error:true, message:"Bad Request"})
    }

    const post = await dbClient.select().from(postsTable).where(eq(postsTable.id, postId))

    if(!post){
        return json({error:true, message:"Post does not exist"})
    }

    const {id, ...rest} = getTableColumns(usersTable)
    const postLikes = await dbClient.select({...rest}).from(likesPostTable).leftJoin(usersTable,eq(usersTable.id, likesPostTable.author)).where(eq(likesPostTable.post, postId))
    
    return json({success: true, data: postLikes})
}