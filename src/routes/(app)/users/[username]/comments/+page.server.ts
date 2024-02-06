import { dbClient } from '$lib/server/db.js';
import { commentsTable, postsTable, usersTable } from '$lib/server/schema.js';
import type { CommentWithProfileImage, PostWithProfileImage } from '$lib/types';
import { redirect } from '@sveltejs/kit';
import { eq, and, isNull, getTableColumns } from 'drizzle-orm';
import { alias } from 'drizzle-orm/pg-core';

type commentWithPost = {
    post: PostWithProfileImage,
    comment: CommentWithProfileImage
}[]

export const load =  async({params})=>{
    const username = params.username
           

    // using an alias to differentiate between the userstable join with the post and the comment
    const commentAuthor = alias(usersTable, "commentAuthor");
    const postAuthor = alias(usersTable, "postAuthor");
    const userComments = await dbClient
    .select({
        comment: {
            ...getTableColumns(commentsTable),
            imageUrl: commentAuthor.profilePictureUrl
        },
        post: {
            ...getTableColumns(postsTable),
            imageUrl: postAuthor.profilePictureUrl
        }
    })
    .from(commentsTable)
    .where(
        and(
            eq(commentsTable.author, username),
            isNull(commentsTable.parentCommentId)
        )
    )
    .leftJoin(postsTable, eq(postsTable.id, commentsTable.post))
    .leftJoin(commentAuthor, eq(commentsTable.author, commentAuthor.username))
    .leftJoin(postAuthor, eq(postsTable.author, postAuthor.username));


    return {
        userComments: userComments as commentWithPost
    }
}