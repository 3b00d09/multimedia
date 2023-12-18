import { dbClient } from '$lib/server/db.js'
import { commentsTable } from '$lib/server/schema.js'
import { json } from '@sveltejs/kit'
import { eq } from 'drizzle-orm'

export const GET = async({url}) =>{
    const commentId = url.searchParams.get("id") as string
    const rows = await dbClient.select().from(commentsTable).where(eq(commentsTable.parentCommentId,commentId))
    return json(rows)
}