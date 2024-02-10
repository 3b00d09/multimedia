import { dbClient } from '$lib/server/db.js'
import { notificationsTable } from '$lib/server/schema.js'
import { json } from '@sveltejs/kit'
import { eq } from 'drizzle-orm'

export const POST = async({locals, request}) =>{
    
    const {notificationId} = await request.json()
    
    await dbClient.update(notificationsTable).set({read: true}).where(eq(notificationsTable.id, notificationId))
    
    return json({})
}