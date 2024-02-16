import { getPostById } from '$lib/server/data/posts.js'
import { dbClient } from '$lib/server/db.js'
import { commentsTable, likesCommentTable, postsTable, usersTable } from '$lib/server/schema.js'
import type { CommentWithProfile, PostWithProfile } from '$lib/types.js'
import { error } from '@sveltejs/kit'
import { count, eq, getTableColumns } from 'drizzle-orm'
import { alias } from 'drizzle-orm/pg-core'

export const load = async({url, params})=>{
    const commentId = params.commentId
    const postId = params.id

    const post = await getPostById(postId)
    
    if(!post){
        throw error(500, {message:"Post not found."})
    }

    const replies = alias(commentsTable, "commentsReplies")
    const _parentComment = await dbClient.select({
        comment:{
            ...getTableColumns(commentsTable), 
            replyCount: count(commentsTable.parentCommentId),
            likeCount: count(likesCommentTable.comment)
        },
        author:{
            ...getTableColumns(usersTable)
        }
    })
    .from(commentsTable)
    .where(eq(commentsTable.id, commentId))
    .leftJoin(usersTable,eq(usersTable.id, commentsTable.author))
    .leftJoin(likesCommentTable, eq(commentsTable.id, likesCommentTable.comment))
    .leftJoin(replies, eq(commentsTable.id, replies.parentCommentId))
    .limit(1)
    .groupBy(commentsTable.id, usersTable.id)

    if(!_parentComment){
        throw error(500, "Invalid comment")
    }

    const parentComment = _parentComment[0] as CommentWithProfile


    const childComments = await dbClient.select({
        comment:{
            ...getTableColumns(commentsTable), 
            replyCount: count(commentsTable.parentCommentId),
            likeCount: count(likesCommentTable.comment)
        },
        author:{
            ...getTableColumns(usersTable)
        }
    })
    .from(commentsTable)
    .where(eq(commentsTable.parentCommentId, parentComment.comment.id))
    .leftJoin(usersTable,eq(usersTable.id, commentsTable.author))
    .leftJoin(likesCommentTable, eq(commentsTable.id, likesCommentTable.comment))
    .leftJoin(replies, eq(commentsTable.id, replies.parentCommentId))
    .groupBy(commentsTable.id, usersTable.id) as CommentWithProfile[]


    return {
        post, childComments, parentComment
    }

}