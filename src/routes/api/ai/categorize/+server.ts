import { categoriesTable, postsTable, categoriesToPostsTable } from "$lib/server/schema"
import { json } from "@sveltejs/kit"
import OpenAI from "openai"
import { API_KEY } from "$env/static/private";
import { dbClient } from "$lib/server/db.js";
import { eq } from "drizzle-orm";

const openai = new OpenAI({
  apiKey: API_KEY,
})

export const POST = async(request) =>{
    const session = request.locals.session

    if(!session) return json({error: true, message: "Not logged in"})

    const data = await request.request.json()

    const {postId} = data
    
    const post = await dbClient.select({content: postsTable.content}).from(postsTable).where(eq(postsTable.id, postId))

    const completion = await openai.chat.completions.create({
    messages:[
      {
        role: "system",
        content:"You are going to categorize a post based on the sentiment it expresses. The categories are as following: sad, comedy, and happy. The number of categories can be maximum 3. Ensure that the sentiment(s) you give are expressed in only 1 word per sentiment."
      },
      {
        role: "user",
        content: post[0].content
      }
    ],
    model:"gpt-3.5-turbo"
  })

  console.log(completion.choices)
    
    return json({success: true})
}