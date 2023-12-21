import { dbClient } from "$lib/server/db"
import { auth } from "$lib/server/lucia.js"
import { commentsTable, postsTable, repliesTable, usersTable } from "$lib/server/schema"
import { eq } from "drizzle-orm"
import {v4 as uuidv4} from "uuid"

// until i figure out how to infer type from joined select
export type PostsJoined = ReturnType<Awaited<typeof fetchPosts>>

type Post = typeof postsTable.$inferInsert
type Comment = typeof commentsTable.$inferInsert

export const load = async({locals}) =>{
    const rows = await fetchPosts()
    const session = await locals.auth.validate()
    const user = await dbClient.select().from(usersTable).where(eq(usersTable.id, session!.user.userId))

    const result = rows.reduce<Record<string, { post: Post; comments: Comment[] }>>(
        (acc, row) => {
          const post = row.posts;
          const comment = row.comments;
          if(!acc[post.id]){
            acc[post.id] = {post, comments:[]}
          }

          if(comment){
            acc[post.id].comments.push(comment);
          }

          return acc;
        },
        {}
      );

      const res = Object.values(result)


    return {
        res,user
    }
}

async function fetchPosts(){
    const rows = await dbClient.select()
        .from(postsTable)
        .leftJoin(commentsTable,eq(postsTable.id, commentsTable.post))
        .orderBy(postsTable.timestamp)
        
    return rows;
}

export const actions ={
    post: async(request)=>{
        
        const authRequest = auth.handleRequest(request)
        const session = await authRequest.validate()
        if(!session){
            return {status: 401, success: false}
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
            return {status: 401, success: false}
        }

        const data = await request.request.formData()
        const commentContent = data.get("comment-content")?.toString()
        const commentAuthor = session.user.username
        const date = new Date();
        const postId = data.get("post_id")?.toString();

        if(!postId){
            return{status: 401, success: false}
        }


        if(commentContent && commentAuthor){
            const newComment: typeof commentsTable.$inferInsert = {
                id: uuidv4(),
                comment: commentContent,
                author: commentAuthor,
                post: postId,
                date: date,
            }
            const createComment = await dbClient.insert(commentsTable).values(newComment)
        }
    },

    reply:async(request)=>{
        const authRequest = auth.handleRequest(request)
        const session = await authRequest.validate()

        if(!session){
            return {status: 401, success: false}
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