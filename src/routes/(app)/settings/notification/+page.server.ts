import { redirect } from '@sveltejs/kit';
import { dbClient } from "$lib/server/db.js";
import {
  usersTable,
} from "$lib/server/schema.js";
import { eq } from 'drizzle-orm';

export const actions = {
    updatePreference: async ( request ) => {
      const session = request.locals.session
      if(!session) throw redirect(301, "/")

        const formData = await request.request.formData();
    
        const postPreference = formData.get('postPreference') as string;

     
        if ( !postPreference) {
          
            throw redirect(303, '/login'); 
        }

 
        await dbClient
        .update(usersTable)
        .set({ postPreference: postPreference})
        .where(eq(usersTable.id, session.userId));

        return{
          success: true
        }
      }
    };