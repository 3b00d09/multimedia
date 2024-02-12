import { dbClient } from '$lib/server/db.js'
import { commentsTable, postsTable, usersTable } from '$lib/server/schema.js'
import { error } from '@sveltejs/kit'
import { eq, getTableColumns } from 'drizzle-orm'

export const load = async({url, params})=>{
    const commentId = params.commentId
    const postId = params.id

    const _post = await dbClient.query.postsTable.findFirst({
        where:eq(postsTable.id, postId)
    })
    
    if(!_post){
        throw error(500, {message:"Post not found."})
    }

    const _parentComment = await dbClient.select({
        ...getTableColumns(commentsTable),
        imageUrl:usersTable.profilePictureUrl
    })
    .from(commentsTable)
    .where(eq(commentsTable.id, commentId))
    .leftJoin(usersTable, eq(commentsTable.author, usersTable.id))
    .limit(1)

    const parentComment = _parentComment[0]



    const childComments = await dbClient
    .select({
        ...getTableColumns(commentsTable),
        imageUrl: usersTable.profilePictureUrl,
        
    })
    .from(commentsTable)
    .where(eq(commentsTable.parentCommentId, commentId))
    .leftJoin(usersTable, eq(commentsTable.author, usersTable.id))


    const postAuthor = await dbClient.query.usersTable.findFirst({
        where:eq(usersTable.id, _post.author)
    })

    if(!postAuthor){
        throw error(500, {message: "Unknown error occured."})
    }

    const post = {
        ..._post,
        commentCount: childComments.length,
        imageUrl: postAuthor.profilePictureUrl
    }


    return {
        post, childComments, postAuthor, parentComment
    }

}