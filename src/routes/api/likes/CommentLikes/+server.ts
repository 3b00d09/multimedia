// src/routes/api/like/+server.js
import { dbClient } from "$lib/server/db.js";
import { likesCommentTable } from "$lib/server/schema.js";
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
  const { commentId} = body;
 


  const existingLike = await dbClient
    .select()
    .from(likesCommentTable)
    .where(and(eq(likesCommentTable.comment, commentId), eq(likesCommentTable.author, session.user.userId)))
    
    console.log(existingLike)

  if (existingLike.length === 0) {
   
    await dbClient.insert(likesCommentTable).values({
      id: uuidv4(),
      comment: commentId,
      author: session.user.userId,
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

  const commentId = request.url.searchParams.get('id') as string
  const row = await dbClient .select().from(likesCommentTable).where(and(eq(likesCommentTable.comment, commentId), eq(likesCommentTable.author, session.user.userId)))


return json({ success: true,liked:row.length>0 });
  }
  
export async function DELETE(request) {
  const authRequest = auth.handleRequest(request);
  const session = await authRequest.validate();

  if (!session?.user) {
    return json({ success: false, message: "User is not authenticated" });
  }

  const body = await request.request.json();
  const { commentId} = body;
 
  const row = await dbClient.delete(likesCommentTable).where(and(eq(likesCommentTable.comment, commentId), eq(likesCommentTable.author, session.user.userId)))
  return json({ success: true,message: "Like are deleted"});
}