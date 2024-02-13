import { getPostById } from '$lib/server/data/posts.js'
import { dbClient } from '$lib/server/db.js'
import { commentsTable, postsTable, usersTable } from '$lib/server/schema.js'
import type { CommentWithProfileImage, PostWithProfile } from '$lib/types.js'
import { error } from '@sveltejs/kit'
import { eq, getTableColumns } from 'drizzle-orm'

export const load = async({url, params})=>{
    const commentId = params.commentId
    const postId = params.id

    const post = await getPostById(postId)
    
    if(!post){
        throw error(500, {message:"Post not found."})
    }

    const _parentComment = await dbClient.select({
        ...getTableColumns(commentsTable),
        imageUrl:usersTable.profilePictureUrl,
        firstName: usersTable.firstName,
        lastName: usersTable.lastName
    })
    .from(commentsTable)
    .where(eq(commentsTable.id, commentId))
    .leftJoin(usersTable, eq(commentsTable.author, usersTable.id))
    .limit(1)

    const parentComment = _parentComment[0] as CommentWithProfileImage



    const childComments = await dbClient
    .select({
        ...getTableColumns(commentsTable),
        imageUrl: usersTable.profilePictureUrl,
        firstName: usersTable.firstName,
        lastName: usersTable.lastName
        
    })
    .from(commentsTable)
    .where(eq(commentsTable.parentCommentId, commentId))
    .leftJoin(usersTable, eq(commentsTable.author, usersTable.id)) as CommentWithProfileImage[]


    const postAuthor = await dbClient.query.usersTable.findFirst({
        where:eq(usersTable.id, post.author.id)
    })

    if(!postAuthor){
        throw error(500, {message: "Unknown error occured."})
    }

    return {
        post, childComments, parentComment
    }

}