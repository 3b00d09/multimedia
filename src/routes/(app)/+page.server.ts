import { dbClient } from "$lib/server/db"
import { auth } from "$lib/server/lucia.js"
import { commentsTable, postsTable, repliesTable } from "$lib/server/schema"
import { eq } from "drizzle-orm"
import {v4 as uuidv4} from "uuid"

// until i figure out how to infer type from joined select
export type PostsJoined = ReturnType<Awaited<typeof fetchPosts>>

type Post = typeof postsTable.$inferInsert
type Comment = typeof commentsTable.$inferInsert

export const load = async() =>{
    const rows = await fetchPosts()

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
        res
    }
}

async function fetchPosts(){
    const rows = await dbClient.select().from(postsTable).leftJoin(commentsTable,eq(postsTable.id, commentsTable.post)).orderBy(postsTable.timestamp)
    return rows;
}

export const actions ={
    default: async(request)=>{
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
        
    }
}