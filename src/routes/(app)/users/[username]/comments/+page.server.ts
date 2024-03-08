import { dbClient } from '$lib/server/db.js';
import { commentsTable, likesCommentTable, likesPostTable, postsTable, usersTable } from '$lib/server/schema.js';
import type { CommentWithProfile, PostWithProfile } from '$lib/helpers/types';
import { redirect } from '@sveltejs/kit';
import { eq, and, isNull, getTableColumns, count, sql, ilike } from 'drizzle-orm';
import { alias } from 'drizzle-orm/pg-core';

type commentWithPost = {
    post: PostWithProfile,
    comment: CommentWithProfile
}

export const load =  async({params})=>{
    const username = params.username
           
    const user = await dbClient.select().from(usersTable).where(ilike(usersTable.username, username))
    
    if(!user){
        return{404: "User not found"}
    }

    // using an alias to differentiate between the userstable join with the post and the comment
    
    const commentAuthor = alias(usersTable, "commentAuthor");
    const postAuthor = alias(usersTable, "postAuthor");
    const replies = alias(commentsTable, "commentsReplies")
    const commentLikes = alias(likesCommentTable, "commentLikes")
    const _userComments = await dbClient
    .select({
        comment: {
            ...getTableColumns(commentsTable),
            replyCount: count(replies.id),
            likeCount: count(commentLikes.comment)

        },
        post: {
            ...getTableColumns(postsTable),
            commentCount:count(commentsTable.post),
            likeCount: count(likesPostTable.post),
        },
        postAuthor:{
            ...getTableColumns(usersTable)
        }

    })
    .from(commentsTable)
    .where(
        and(
            eq(commentsTable.author, user[0].id),
            isNull(commentsTable.parentCommentId)
        )
    )
    .leftJoin(postsTable, eq(postsTable.id, commentsTable.post))
    .leftJoin(usersTable, eq(postsTable.author, usersTable.id))
    .leftJoin(replies, eq(commentsTable.id, replies.parentCommentId))
    .leftJoin(likesPostTable, eq(postsTable.id, likesPostTable.post))
    .leftJoin(commentLikes, eq(commentsTable.id, commentLikes.comment))
    .leftJoin(commentAuthor, eq(commentsTable.author, commentAuthor.username))
    .leftJoin(postAuthor, eq(postsTable.author, postAuthor.username))
    .groupBy(commentsTable.id, commentAuthor.profilePictureUrl, postsTable.id, postAuthor.profilePictureUrl, replies.parentCommentId, usersTable.id)

    const userComments = _userComments.map((row)=>{
        if(row.post && row.postAuthor){
            const data: commentWithPost = {
                post:{
                    post: row.post,
                    author: row.postAuthor
                },
                comment:{
                    comment:row.comment,
                    author: user[0]
                }
            }
            return data
        }
    })
    
    return {
        userComments
    }
}