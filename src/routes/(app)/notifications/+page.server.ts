import { dbClient } from "$lib/server/db.js"
import { notificationsTable, usersTable } from "$lib/server/schema.js"
import { redirect } from "@sveltejs/kit"
import { eq, getTableColumns } from "drizzle-orm"

export const load = async(request) =>{
    const session = request.locals.session
    
    if(!session) throw redirect(301, "/login")
    const {password, ...rest} = getTableColumns(usersTable)
    const user = await dbClient.select({user:{...rest}}).from(usersTable).where(eq(usersTable.id, session.userId))
    const notifications = await dbClient.select({
        notification: getTableColumns(notificationsTable),
        user: {...rest}
    }).from(notificationsTable).where(eq(notificationsTable.targetUser, session.userId)).leftJoin(usersTable, eq(usersTable.id, notificationsTable.sourceUser))
    return{
        user, notifications
    }
}