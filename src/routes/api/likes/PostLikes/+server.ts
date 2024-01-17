// src/routes/api/like/+server.js
import { dbClient } from "$lib/server/db.js";
import { likes_post } from "$lib/server/schema.js";
import { json } from "@sveltejs/kit";
import { eq, and} from "drizzle-orm";
import { v4 as uuidv4 } from "uuid";
import { auth } from "$lib/server/lucia.js"

export async function POST( request) {
  const authRequest = auth.handleRequest(request);
  const session = await authRequest.validate();

  if (!session?.user) {
    return json({ success: false, message: "User is not authenticated" });
  }

  const body = await request.request.json();
  const { postId} = body;
 


  const existingLike = await dbClient
    .select()
    .from(likes_post)
    .where(and(eq(likes_post.post, postId), eq(likes_post.author, session.user.username)))
    
    console.log(existingLike)

  if (existingLike.length === 0) {
   
    await dbClient.insert(likes_post).values({
      id: uuidv4(),
      post: postId,
      author: session.user.username,
      date: new Date(),
    });

    return json({ success: true, message: "Like added successfully." });
  }
}


export async function GET(request) {
  const authRequest = auth.handleRequest(request);
  const session = await authRequest.validate();

  if (!session?.user) {
    return json({ success: false, message: "User is not authenticated" });
  
  }

  const postId = request.url.searchParams.get('id') as string
  const row = await dbClient .select().from(likes_post).where(and(eq(likes_post.post, postId), eq(likes_post.author, session.user.username)))



return json({ success: true,liked:row.length>0 });
  }
  


export async function DELETE(request) {
  const authRequest = auth.handleRequest(request);
  const session = await authRequest.validate();

  if (!session?.user) {
    return json({ success: false, message: "User is not authenticated" });
  
  }

  const body = await request.request.json();
  const { postId} = body;
 
  const row = await dbClient.delete(likes_post).where(and(eq(likes_post.post, postId), eq(likes_post.author, session.user.username)))
  return json({ success: true,message: "Like are deleted"});
}