// src/routes/api/like/+server.js
import { dbClient } from "$lib/server/db.js";
import { likesCommentTable } from "$lib/server/schema.js";
import { json, redirect } from "@sveltejs/kit";
import { eq, and} from "drizzle-orm";
import { v4 as uuidv4 } from "uuid";
import { auth } from "$lib/server/lucia.js"

export async function POST( request) {
  const session = request.locals.session
  if (!session) throw redirect(301, "/login");


  const body = await request.request.json();
  const { commentId} = body;
 


  const existingLike = await dbClient
    .select()
    .from(likesCommentTable)
    .where(and(eq(likesCommentTable.comment, commentId), eq(likesCommentTable.author, session.userId)))
    
    console.log(existingLike)

  if (existingLike.length === 0) {
   
    await dbClient.insert(likesCommentTable).values({
      id: uuidv4(),
      comment: commentId,
      author: session.userId,
      date: new Date(),
    });

    return json({ success: true, message: "Like added successfully." });
  }
}


export async function GET(request) {
  const session = request.locals.session
  if (!session) throw redirect(301, "/login");


  const commentId = request.url.searchParams.get('id') as string
  const row = await dbClient .select().from(likesCommentTable).where(and(eq(likesCommentTable.comment, commentId), eq(likesCommentTable.author, session.userId)))


return json({ success: true,liked:row.length>0 });
  }
  
export async function DELETE(request) {
  const session = request.locals.session
  if (!session) throw redirect(301, "/login");


  const body = await request.request.json();
  const { commentId} = body;
 
  const row = await dbClient.delete(likesCommentTable).where(and(eq(likesCommentTable.comment, commentId), eq(likesCommentTable.author, session.userId)))
  return json({ success: true,message: "Like are deleted"});
}