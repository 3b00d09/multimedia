import { dbClient } from "$lib/server/db"
import { auth } from "$lib/server/lucia.js"
import { commentsTable,  postsTable, usersTable,likesPostTable, notificationsTable } from "$lib/server/schema"
import { redirect } from "@sveltejs/kit"
import { count, desc, eq, like, sql } from "drizzle-orm"
import {v4 as uuidv4} from "uuid"

// until i figure out how to infer type from joined select
export type PostsJoined = ReturnType<Awaited<typeof fetchPosts>>

type Post = typeof postsTable.$inferInsert
type Comment = typeof commentsTable.$inferInsert

export const load = async() =>{
    const rows = await fetchPosts()
  
    return {
        rows
    }
}

async function fetchPosts(){
    const rows = await dbClient.select({
        id:postsTable.id,
        author: postsTable.author,
        content: postsTable.content,
        timestamp: postsTable.timestamp,
        imageUrl: usersTable.profilePictureUrl,
        firstName: usersTable.firstName,
        lastName: usersTable.lastName
    })
        .from(postsTable)
        .leftJoin(commentsTable,eq(postsTable.id, commentsTable.post))
        .leftJoin(usersTable,eq(postsTable.author, usersTable.username))
        .orderBy(desc(postsTable.timestamp))
        .groupBy(postsTable.id, usersTable.id)
        
    return rows;
}

export const actions ={
    post: async(request)=>{
        
        const authRequest = auth.handleRequest(request)
        const session = await authRequest.validate()
        if(!session){
            throw redirect(301, "/login")
        }
        
        const data = await request.request.formData()
        const postContent = data.get("post-content")?.toString()
        const postAuthor = session.user.username
        const date = new Date();

        if(postAuthor && postContent){
            const newPost: typeof postsTable.$inferInsert = {
                id: uuidv4(),
                content: postContent,
                author: postAuthor,
                timestamp: date,
            }
            const createPost = await dbClient.insert(postsTable).values(newPost)
        }
        
    },

    comment:async(request)=>{
        const authRequest = auth.handleRequest(request)
        const session = await authRequest.validate()

        if(!session){
            throw redirect(301, "/login")
        }

        const data = await request.request.formData()
        const commentContent = data.get("comment-content")?.toString()
        const commentAuthor = session.user.username
        const date = new Date();
        const postId = data.get("post_id")?.toString();

        if(!postId){
            return{status: 401, success: false}
        }


        const newCommentId = uuidv4()
        if(commentContent && commentAuthor){
            const newComment: typeof commentsTable.$inferInsert = {
                id: newCommentId,
                comment: commentContent,
                author: commentAuthor,
                post: postId,
                date: date,
            }
            const createComment = await dbClient.insert(commentsTable).values(newComment)

            if(createComment){
                const targetUser = await dbClient.select({userId: usersTable.id}).from(postsTable).where(eq(postsTable.id, postId)).leftJoin(usersTable,eq(usersTable.username,postsTable.author))
                await dbClient.insert(notificationsTable).values({
                    id: uuidv4(),
                    sourceUser: session.user.userId,
                    targetUser: targetUser[0].userId!,
                    postId: postId,
                    commentId: newCommentId,
                    type: "comment"
                  });
            }
        }
    },

    reply:async(request)=>{
        const authRequest = auth.handleRequest(request)
        const session = await authRequest.validate()

        if(!session){
            throw redirect(301, "/login")
        }

        const data = await request.request.formData()
        const replyContent = data.get("reply-content")?.toString()
        const replyAuthor = session.user.username
        const date = new Date();
        const parentCommentId = data.get("parent_comment_id")?.toString();

        if(!parentCommentId){
            return{status: 401, success: false}
        }

        if(replyContent && replyAuthor){
            const newComment: typeof commentsTable.$inferInsert = {
                id: uuidv4(),
                comment: replyContent,
                author: replyAuthor,
                date: date,
                parentCommentId: parentCommentId
            }
            const createReply = await dbClient.insert(commentsTable).values(newComment)
        }

    }
}