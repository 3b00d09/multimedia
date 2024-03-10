import { groupMembers, groupsTable } from '$lib/server/schema.js';
import { dbClient } from '$lib/server/db.js';
import { v4 as uuidv4 } from "uuid";
import { redirect } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';

export const load = async(request)=>{
    const session = request.locals.session
    if(!session) throw redirect(301, "/login")

    const groups = await dbClient.select().from(groupsTable).where(eq(groupsTable.creator, session.userId))

    return {groups}
}

export const actions = {
    createGroup:async(request)=>{
        const session = request.locals.session;

        if(session){
            const data = await request.request.formData()
            const groupName = data.get("group-name")
            const groupDescription = data.get("group-description")
            if(groupName){ 
                try{
                    const newId = uuidv4();
                    await dbClient.insert(groupsTable).values({
                        id: newId,
                        name: groupName.toString(),
                        creator: session.userId,
                        description: groupDescription ? groupDescription.toString() : null
                    })

                    await dbClient.insert(groupMembers).values({
                        id: uuidv4(),
                        member: session.userId,
                        group: newId
                    })
                }
                catch(e){
                    return{error:true, message: "Failed to create. Please try again later."}
                }

            }else{
                return{error: true, message:"Please enter a group name."}
            }
          return{success: true}  
        }
        else{
            throw redirect(301, "/login")
        }
        
    }
}