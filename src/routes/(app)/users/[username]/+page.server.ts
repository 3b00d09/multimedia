import { dbClient } from "$lib/server/db.js"
import { auth } from "$lib/server/lucia"
import { userFollowsTable, usersTable } from "$lib/server/schema.js"
import { redirect } from "@sveltejs/kit"
import { and, ilike } from "drizzle-orm"
import {v4 as uuidv4} from "uuid"


export const load = async({locals}) =>{
    const session = await locals.auth.validate()

    if(session){
        throw redirect(301, `/users/${session.user.username}/posts`)
    }

    else{
        throw redirect(301, "/login")
    }
}

export const actions= {

    follow: async(request)=>{
                
        const authRequest = auth.handleRequest(request)
        const session = await authRequest.validate()
        if(!session){
            throw redirect(301, "/login")
        }
        
        const username = request.params.username

        // woohoo case sensitivity
        const _followedUser = await dbClient.select().from(usersTable).where(ilike(usersTable.username, username))
        const followedUser = _followedUser[0].username

        const row = await dbClient.insert(userFollowsTable).values({follower: session.user.username, following: followedUser, id:uuidv4()})
    },


    unfollow: async(request)=>{
                
        const authRequest = auth.handleRequest(request)
        const session = await authRequest.validate()
        if(!session){
            throw redirect(301, "/login")
        }
        
        const username = request.params.username

        const row = await dbClient.delete(userFollowsTable)
        .where
        (
            and(
                ilike(userFollowsTable.follower, session.user.username),
                ilike(userFollowsTable.following, username)
            )
        )
        
        console.log(row)
    }
}
