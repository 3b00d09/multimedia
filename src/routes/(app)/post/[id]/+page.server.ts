import { dbClient } from '$lib/server/db.js'
import { commentsTable, postsTable, usersTable, likesPostTable } from '$lib/server/schema.js'
import { eq, getTableColumns } from 'drizzle-orm'
import { error } from '@sveltejs/kit'
import type { CommentWithProfileImage, PostWithProfile } from '$lib/types'


export const load = async({params})=>{

    const postId = params.id

    const _post = await dbClient.select({
        id:postsTable.id,
        author: usersTable.username,
        content: postsTable.content,
        timestamp: postsTable.timestamp,
        imageUrl: usersTable.profilePictureUrl,
        firstName: usersTable.firstName,
        lastName: usersTable.lastName

    }).from(postsTable).leftJoin(usersTable,eq(postsTable.author,usersTable.id)).where(eq(postsTable.id, postId))

    
    if(!_post[0]){
        throw error(500, {message:"Post not found."})
    }

    const comments = await dbClient
    .select({
        id: commentsTable.id,
        comment: commentsTable.comment,
        date: commentsTable.date,
        author: usersTable.username,
        imageUrl: usersTable.profilePictureUrl,
        firstName: usersTable.firstName,
        lastName: usersTable.lastName,
        parentCommentId: commentsTable.parentCommentId,
        post: commentsTable.post
    })
    .from(commentsTable)
    .where(eq(commentsTable.post, postId))
    .leftJoin(usersTable, eq(commentsTable.author, usersTable.id)) as CommentWithProfileImage[]

    const post = _post[0] as PostWithProfile
    return {
        post, comments,
    }
}