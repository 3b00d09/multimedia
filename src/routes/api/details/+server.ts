import { dbClient } from '$lib/server/db.js'
import { usersTable } from '$lib/server/schema.js'
import { json, redirect } from '@sveltejs/kit'
import { ilike } from 'drizzle-orm'

export const POST = async({locals, request}) =>{
    const session = await locals.auth.validate()

    if(!session){
        return json({error: true})
    }
    const data = await request.json()
    
    // currently sets fields to null if the user submits empty field when data previously exists
    await dbClient.update(usersTable).set({...data}).where(ilike(usersTable.username, session.user.username))

    return json({success:true})
}   