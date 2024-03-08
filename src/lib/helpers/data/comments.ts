import { postsTable, usersTable, likesPostTable, commentsTable, likesCommentTable, } from "../../server/schema";
import { dbClient } from "../../server/db";
import {eq, desc, getTableColumns, count, and, isNull} from "drizzle-orm"
import type {CommentWithProfile, PostWithProfile} from "../types"
import { alias } from "drizzle-orm/pg-core";

export async function getComments(postId: string){

    // using subqueries because jamming both aggregating count functions into one query is causing a cartesian product issue
    const likeSubquery = dbClient.select({likeCount:count(likesCommentTable.id).as("likeCount"), comment:likesCommentTable.comment}).from(likesCommentTable).groupBy(likesCommentTable.comment).as("likeSubquery")
    const repliesSubquery = dbClient.select({commentCount:count(commentsTable.parentCommentId).as("commentCount"), comment: commentsTable.parentCommentId}).from(commentsTable).groupBy(commentsTable.parentCommentId).as("repliesSubquery")
    
    const _rows = await dbClient.select({
        comment: {...getTableColumns(commentsTable),
        likeCount: likeSubquery.likeCount, 
        replyCount:repliesSubquery.commentCount},
        author: {...getTableColumns(usersTable)},
    })
        .from(commentsTable)
        .where(
            and(
            eq(commentsTable.post, postId),
            isNull(commentsTable.parentCommentId)
            )
        )
        .leftJoin(usersTable,eq(commentsTable.author, usersTable.id))
        .leftJoin(likeSubquery,eq(commentsTable.id, likeSubquery.comment))
        .leftJoin(repliesSubquery,eq(commentsTable.id, repliesSubquery.comment)) as CommentWithProfile[]

    const rows = _rows.map((data)=>{
        if(data.comment.replyCount === null){
            data.comment.replyCount = 0
        }
        if (data.comment.likeCount === null){
            data.comment.likeCount = 0
        }
        return data
    })

    return rows
}

export async function getCommentsByUser(userId: string){

    // using subqueries because jamming both aggregating count functions into one query is causing a cartesian product issue
    const likeSubquery = dbClient.select({likeCount:count(likesCommentTable.id).as("likeCount"), comment:likesCommentTable.comment}).from(likesCommentTable).groupBy(likesCommentTable.comment).as("likeSubquery")
    const repliesSubquery = dbClient.select({commentCount:count(commentsTable.parentCommentId).as("commentCount"), comment: commentsTable.parentCommentId}).from(commentsTable).groupBy(commentsTable.id).as("repliesSubquery")
    
    const _rows = await dbClient.select({
        comment: {...getTableColumns(commentsTable),
        likeCount: likeSubquery.likeCount, 
        replyCount:repliesSubquery.commentCount},
        author: {...getTableColumns(usersTable)},
    })
        .from(commentsTable)
        .where(eq(commentsTable.author, userId))
        .leftJoin(usersTable,eq(commentsTable.author, usersTable.id))
        .leftJoin(likeSubquery,eq(commentsTable.id, likeSubquery.comment))
        .leftJoin(repliesSubquery,eq(commentsTable.id, repliesSubquery.comment)) as CommentWithProfile[]

    const rows = _rows.map((data)=>{
        if(data.comment.replyCount === null){
            data.comment.replyCount = 0
        }
        if (data.comment.likeCount === null){
            data.comment.likeCount = 0
        }
        return data
    })

    return rows
}

export async function getCommentById(id: string){
    const replies = alias(commentsTable, "commentsReplies")

    const row = await dbClient.select({
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
    .where(eq(commentsTable.id, id))
    .leftJoin(usersTable,eq(usersTable.id, commentsTable.author))
    .leftJoin(likesCommentTable, eq(commentsTable.id, likesCommentTable.comment))
    .leftJoin(replies, eq(commentsTable.id, replies.parentCommentId))
    .limit(1)
    .groupBy(commentsTable.id, usersTable.id)

    return row[0] as CommentWithProfile

}    

export async function getReplies(id: string){
    const replies = alias(commentsTable, "commentsReplies")
     const rows = await dbClient.select({
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
    .where(eq(commentsTable.parentCommentId, id))
    .leftJoin(usersTable,eq(usersTable.id, commentsTable.author))
    .leftJoin(likesCommentTable, eq(commentsTable.id, likesCommentTable.comment))
    .leftJoin(replies, eq(commentsTable.id, replies.parentCommentId))
    .groupBy(commentsTable.id, usersTable.id)

    return rows as CommentWithProfile[]
}