import { dbClient } from '$lib/server/db.js';
import { groupMembers, groupsTable, usersTable } from '$lib/server/schema.js';
import { redirect } from '@sveltejs/kit';
import { and, eq, ne } from 'drizzle-orm';

export const load = async(request) =>{
    const session = request.locals.session;

    if(!session) throw redirect(301, "/login");
    const joinedGroups = await dbClient.select().from(groupMembers).leftJoin(groupsTable,eq(groupsTable.id, groupMembers.group)).where(
        and(
            eq(groupMembers.member, session.userId),
            ne(groupsTable.creator, session.userId)
        )
        
    )

    return{
        joinedGroups
    }
    
}