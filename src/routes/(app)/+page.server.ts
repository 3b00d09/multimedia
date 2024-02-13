import { getPosts } from "$lib/server/data/posts.js"
import { dbClient } from "$lib/server/db"
import { auth } from "$lib/server/lucia.js"
import { commentsTable,  postsTable, usersTable,likesPostTable, notificationsTable } from "$lib/server/schema"
import type { PostWithProfile } from "$lib/types.js"
import { redirect } from "@sveltejs/kit"
import { count, desc, eq, like, sql } from "drizzle-orm"
import {v4 as uuidv4} from "uuid"


type Post = typeof postsTable.$inferInsert
type Comment = typeof commentsTable.$inferInsert

export const load = async() =>{
    const rows = await getPosts()
  
    return {
        rows
    }
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
        const postAuthor = session.user.userId
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
        const commentAuthor = session.user.userId
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
                const targetUser = await dbClient.select({userId: usersTable.id}).from(postsTable).where(eq(postsTable.id, postId)).leftJoin(usersTable,eq(usersTable.id,postsTable.author))
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
        const replyAuthor = session.user.userId
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