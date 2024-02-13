import { dbClient } from '$lib/server/db.js'
import { commentsTable, postsTable, usersTable, likesPostTable } from '$lib/server/schema.js'
import { eq, getTableColumns } from 'drizzle-orm'
import { error } from '@sveltejs/kit'
import type { CommentWithProfileImage, PostWithProfile } from '$lib/types'
import { getPostById } from '$lib/server/data/posts.js'


export const load = async({params})=>{

    const postId = params.id

    const post = await getPostById(postId)

    if(!post){
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

    return {
        post, comments,
    }
}