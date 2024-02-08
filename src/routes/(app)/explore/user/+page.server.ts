import { dbClient } from '$lib/server/db.js';
import {usersTable } from '$lib/server/schema.js';


export const load = async ({ locals }) => {
   
    const allUsers = await dbClient.select({
       username:usersTable.username,
        imageUrl: usersTable.profilePictureUrl, 
        bio:usersTable.bio,
    })
        .from(usersTable)
    


    return {
      allUsers
    };
}