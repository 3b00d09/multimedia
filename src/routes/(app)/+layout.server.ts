import { redirect } from "@sveltejs/kit";

import type { LayoutServerLoad } from "./$types";
import { dbClient } from "$lib/server/db";
import { notificationsTable, usersTable } from "$lib/server/schema";
import { eq } from "drizzle-orm"
import { getPosts } from "$lib/server/data/posts";
import { getComments } from "$lib/server/data/comments";

export const load: LayoutServerLoad = async ({ locals }) => {
    await getComments("e4cf216a-29ff-48fa-aa46-080a7519f792")
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