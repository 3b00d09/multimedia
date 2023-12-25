import { dbClient } from '$lib/server/db.js'
import { commentsTable, postsTable, usersTable } from '$lib/server/schema.js'
import { eq } from 'drizzle-orm'
import { error } from '@sveltejs/kit'

export const load = async({url})=>{

    let postId = url.pathname.toString()
    postId = postId.slice(postId.lastIndexOf("/") + 1, postId.length)

    const post = await dbClient.query.postsTable.findFirst({
        where:eq(postsTable.id, postId)
    })
    
    if(!post){
        throw error(500, {message:"Post not found."})
    }

    const comments = await dbClient
    .select({
        id: commentsTable.id,
        content: commentsTable.comment,
        date: commentsTable.date,
        author: commentsTable.author,
        profileImg: usersTable.profilePictureUrl
    })
    .from(commentsTable)
    .where(eq(commentsTable.post, postId))
    .leftJoin(usersTable, eq(commentsTable.author, usersTable.username))

    const postAuthor = await dbClient.query.usersTable.findFirst({
        where:eq(usersTable.username, post.author)
    })

    if(!postAuthor){
        throw error(500, {message: "Unknown error occured."})
    }

    return {
        post, comments, postAuthor
    }
}