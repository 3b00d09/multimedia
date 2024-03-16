import { dbClient } from '$lib/server/db.js';
import {usersTable } from '$lib/server/schema.js';
export const load = async ( local ) => {

    const allUsers = await dbClient.select({
        username:usersTable.username,
         imageUrl: usersTable.profilePictureUrl, 
         bio:usersTable.bio,
         backgroungimg:usersTable.profileBackgroundUrl,
         firstName:usersTable.firstName,
         lastName:usersTable.lastName,
     })
         .from(usersTable)
     
    
      return {
     
        allUsers,
      };
    }