// src/routes/api/like/+server.js
import { dbClient } from "$lib/server/db.js";
import { likesPostTable, notificationsTable, postsTable, usersTable } from "$lib/server/schema.js";
import { json, redirect } from "@sveltejs/kit";
import { eq, and} from "drizzle-orm";
import { v4 as uuidv4 } from "uuid";
import { auth } from "$lib/server/lucia.js"

export async function POST( request) {
  const session = request.locals.session
  if (!session) throw redirect(301, "/login");



  const body = await request.request.json();
  const { postId} = body;
 


  const existingLike = await dbClient
    .select()
    .from(likesPostTable)
    .where(and(eq(likesPostTable.post, postId), eq(likesPostTable.author, session.userId)))

  if (existingLike.length === 0) {
   
    await dbClient.insert(likesPostTable).values({
      id: uuidv4(),
      post: postId,
      author: session.userId,
      date: new Date(),
    });

    const targetUser = await dbClient.select({userId: usersTable.id}).from(postsTable).where(eq(postsTable.id, postId)).leftJoin(usersTable,eq(usersTable.id,postsTable.author))
    
    if(targetUser[0].userId != session.userId){
      await dbClient.insert(notificationsTable).values({
        id: uuidv4(),
        sourceUser: session.userId,
        targetUser: targetUser[0].userId!,
        entityId: postId,
        entityType: "post_like"
      });
    }


    return json({ success: true, message: "Like added successfully." });
  }
}


export async function GET(request) {
  const session = request.locals.session
  if(!session) throw redirect(301, "/")


  const postId = request.url.searchParams.get('id') as string
  const row = await dbClient .select().from(likesPostTable).where(and(eq(likesPostTable.post, postId), eq(likesPostTable.author, session.userId)))



return json({ success: true,liked:row.length>0 });
  }
  


export async function DELETE(request) {
  const session = request.locals.session
  if (!session) throw redirect(301, "/login");



  const body = await request.request.json();
  const { postId} = body;
 
  const row = await dbClient.delete(likesPostTable).where(and(eq(likesPostTable.post, postId), eq(likesPostTable.author, session.userId)))
  return json({ success: true,message: "Like are deleted"});
}