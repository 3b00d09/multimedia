import { likesPostTable,likesCommentTable, commentsTable, repliesTable } from "$lib/server/schema.js";
import { dbClient } from "$lib/server/db.js";
import { json } from "@sveltejs/kit";
import { count } from 'drizzle-orm';
import { eq} from "drizzle-orm";


export const GET = async ({request}) =>{

const url = new URL(request.url)

const id = url.searchParams.get("id")
const src =  url.searchParams.get("src")


if(src ==="post" && id ){
  const rows = await dbClient.select({value:count(likesPostTable.id)}).from(likesPostTable).where(eq(likesPostTable.post,id))

  const commentCount = await dbClient.select({value:count(commentsTable.id)}).
  from(commentsTable).where(eq(commentsTable.post,id))

  return json({ success: true, likesCount: rows[0].value, commentCount: commentCount[0].value});
}

else if (src === "comment"&&id){
  const rows = await dbClient.select({value:count(likesCommentTable.id)}).from(likesCommentTable).where(eq(likesCommentTable.comment,id))
  const replyCount = await dbClient.select({ value: count(commentsTable.id) })
  .from(commentsTable)
  .where(eq(commentsTable.parentCommentId, id));
  return json({ success: true, count: rows[0].value, replyCount: replyCount[0].value});
}
else{
  return json({ success: false, message: "Invalide routes" });
}

}
