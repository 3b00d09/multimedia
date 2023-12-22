import { dbClient } from '$lib/server/db.js'
import { commentsTable, usersTable } from '$lib/server/schema.js'
import { eq } from 'drizzle-orm'

export const load = async({url})=>{
    let postId = url.pathname.toString()
    postId = postId.slice(postId.lastIndexOf("/") + 1, postId.length)
    const comments = await dbClient.select().from(commentsTable).where(eq(commentsTable.post, postId))
    console.log(comments)

    return {
        comments
    }
}