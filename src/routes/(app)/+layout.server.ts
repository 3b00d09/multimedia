import { redirect } from "@sveltejs/kit";

import type { LayoutServerLoad } from "./$types";
import { dbClient } from "$lib/server/db";
import { notificationsTable, usersTable } from "$lib/server/schema";
import { eq } from "drizzle-orm"
import { getPosts } from "$lib/server/data/posts";

export const load: LayoutServerLoad = async ({ locals }) => {
    await getPosts()
	const session = await locals.auth.validate();
	if (session){
        const notifications = await dbClient.select().from(notificationsTable).where(eq(notificationsTable.targetUser, session.user.userId)).leftJoin(usersTable,eq(usersTable.id, notificationsTable.sourceUser))
        return {
            user: session.user,
            notifications
        };
    }
    return{
        user: null
    }
    
	
};