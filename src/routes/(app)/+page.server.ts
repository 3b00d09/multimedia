import { dbClient } from "$lib/server/db"
import { auth } from "$lib/server/lucia.js"
import { postsTable } from "$lib/server/schema"
import {v4 as uuidv4} from "uuid"
type newPost = typeof postsTable.$inferInsert
export const load = async() =>{
    const data = await dbClient.select().from(postsTable)
    return {
        data
    }
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
            const newPost:newPost = {
                id: uuidv4(),
                content: postContent,
                author: postAuthor,
                timestamp: date,
            }
            const createPost = await dbClient.insert(postsTable).values(newPost)
        }
        
    }
}