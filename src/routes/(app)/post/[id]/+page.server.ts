import { dbClient } from '$lib/server/db.js'
import { commentsTable, postsTable, usersTable } from '$lib/server/schema.js'
import { eq } from 'drizzle-orm'
import { error } from '@sveltejs/kit'
import type { PostWithCommentCount } from '$lib/types.js'

export const load = async({url})=>{

    let postId = url.pathname.toString()
    postId = postId.slice(postId.lastIndexOf("/") + 1, postId.length)

    const _post = await dbClient.query.postsTable.findFirst({
        where:eq(postsTable.id, postId)
    })
    
    if(!_post){
        throw error(500, {message:"Post not found."})
    }

    const comments = await dbClient
    .select({
        id: commentsTable.id,
        comment: commentsTable.comment,
        date: commentsTable.date,
        author: commentsTable.author,
        imageUrl: usersTable.profilePictureUrl,
        parentCommentId: commentsTable.parentCommentId,
        post: commentsTable.post
        
    })
    .from(commentsTable)
    .where(eq(commentsTable.post, postId))
    .leftJoin(usersTable, eq(commentsTable.author, usersTable.username))

    const postAuthor = await dbClient.query.usersTable.findFirst({
        where:eq(usersTable.username, _post.author)
    })

    if(!postAuthor){
        throw error(500, {message: "Unknown error occured."})
    }

    const post:PostWithCommentCount = {
        ..._post,
        commentCount: comments.length,
        imageUrl: postAuthor.profilePictureUrl
    }
    return {
        post, comments, postAuthor
    }
}