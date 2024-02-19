import { dbClient } from '$lib/server/db.js'
import { usersTable } from '$lib/server/schema.js'
import { json, redirect } from '@sveltejs/kit'
import { eq } from 'drizzle-orm'

export const POST = async(request) =>{
    const session = request.locals.session
    if(!session) throw redirect(301, "/")
  
  
    const data = await request.request.json()
    
    // currently sets fields to null if the user submits empty field when data previously exists
    await dbClient.update(usersTable).set({...data}).where(eq(usersTable.id, session.userId))

    return json({success:true})
}   