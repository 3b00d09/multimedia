import { redirect } from "@sveltejs/kit";

import type { LayoutServerLoad } from "./$types";
import { dbClient } from "$lib/server/db";
import { notificationsTable, usersTable } from "$lib/server/schema";
import { eq } from "drizzle-orm"
import { getFollowingPosts, getLikedPosts, getPosts } from "$lib/server/data/posts";
import { getComments } from "$lib/server/data/comments";

export const load: LayoutServerLoad = async (request) => {
    await getComments("e4cf216a-29ff-48fa-aa46-080a7519f792")
	if(!request.locals.user) throw redirect(302, "/login")

    return{
        user: request.locals.user
    }
    
	
};