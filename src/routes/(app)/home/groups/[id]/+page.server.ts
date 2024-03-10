import { dbClient } from '$lib/server/db.js'
import { groupMembers, groupPosts, groupsTable, postsTable, usersTable } from '$lib/server/schema.js'
import { redirect } from '@sveltejs/kit'
import { and, eq, getTableColumns } from 'drizzle-orm'

export const load = async(request) =>{
    const session =  request.locals.session

    if(!session) throw redirect(301, "/")

    const groupId = request.params.id

    const group = await dbClient.select().from(groupsTable).where(eq(groupsTable.id, groupId))

    if(group.length === 0) return{}

    const joinedGroups = await dbClient.select({...getTableColumns(groupsTable)}).from(groupsTable).leftJoin(groupMembers, eq(groupMembers.group, groupsTable.id)).where(eq(groupMembers.member, session.userId))
    if(joinedGroups.length === 0) return{}

    const groups = joinedGroups

    const posts = await dbClient.select().from(groupPosts).where(eq(groupPosts.group, groupId)).leftJoin(postsTable, eq(postsTable.id, groupPosts.post)).leftJoin(usersTable,eq(postsTable.author, usersTable.id))

    return{
        posts, groups
    }
}   