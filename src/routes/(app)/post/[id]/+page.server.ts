import { dbClient } from '$lib/server/db.js'
import { commentsTable, postsTable, usersTable, likesPostTable } from '$lib/server/schema.js'
import { eq } from 'drizzle-orm'
import { error } from '@sveltejs/kit'
import type { PostWithProfileImage } from '$lib/types'


export const load = async({params})=>{

    const postId = params.id

    const _post = await dbClient.query.postsTable.findFirst({
        where:eq(postsTable.id, postId)
    })
    
    if(!_post){
        throw error(500, {message:"Post not found."})
    }


    const _like = await dbClient.select().from(likesPostTable).where(eq(likesPostTable.post,postId));
    
 




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
    
    const post:PostWithProfileImage = {
        ..._post,
        imageUrl: postAuthor.profilePictureUrl
    }

    return {
        post, comments, postAuthor,
    }
}