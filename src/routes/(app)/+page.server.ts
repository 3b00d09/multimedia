import { dbClient } from "$lib/server/db"
import { auth } from "$lib/server/lucia.js"
import { commentsTable, postsTable, repliesTable } from "$lib/server/schema"
import { eq } from "drizzle-orm"
import {v4 as uuidv4} from "uuid"

// until i figure out how to infer type from joined select
export type PostsJoined = ReturnType<Awaited<typeof fetchPosts>>

export const load = async() =>{
    const posts = await fetchPosts()

    return {
        posts
    }
}

async function fetchPosts(){
    const posts = await dbClient.select().from(postsTable).leftJoin(commentsTable,eq(postsTable.id, commentsTable.post)).leftJoin(repliesTable,eq(commentsTable.id,repliesTable.originalComment)).orderBy(postsTable.timestamp)
    return posts;
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