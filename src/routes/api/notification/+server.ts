import type { PostLikenotification } from '$lib/helpers/types.js'
import { dbClient } from '$lib/server/db.js'
import { commentsTable, likesCommentTable, likesPostTable, notificationsTable, postsTable, usersTable } from '$lib/server/schema.js'
import { json } from '@sveltejs/kit'
import { eq, getTableColumns, like } from 'drizzle-orm'
import type { NotificationItemType } from '$lib/helpers/types.js'


export const POST = async({locals, request}) =>{
    
    const {notificationId} = await request.json()
    
    await dbClient.update(notificationsTable).set({read: true}).where(eq(notificationsTable.id, notificationId))
    
    return json({})
}


export const GET = async(request)=>{
    const session = request.locals.session

    if(!session) return json({success: false, message: "User not logged in"})

    const notificationId = request.url.searchParams.get("id")
    const type = request.url.searchParams.get("type")
    if(!notificationId || !type) return json({error: true, message: "Missing notification data"})

    const notification = await dbClient.select().from(notificationsTable).where(eq(notificationsTable.id, notificationId))

    if(!notification) return json ({error: true, message: "Invalid notification"})

    let data:{content: string, parentId: string} | undefined;

    if(!notification[0].entityId) return json({error: true, message: "Unknown error occured"})

    if(type === "post_like") data = await postLikeNotification(notification[0].entityId)
    else if (type === "comment_like") data = await commentLikeNotification(notification[0].entityId)
    else if (type === "comment" || type === "reply") data = await CommentNotification(notification[0].entityId)

    const {password, ...rest} = getTableColumns(usersTable)

    const sourceUser = await dbClient.select({...rest}).from(usersTable).where(eq(usersTable.id, notification[0].sourceUser))

    const response: NotificationItemType = {
        content: data?.content,
        sourceUser: sourceUser[0],
        parentId: data?.parentId
    }

    return json({success: true, data:response})

}


async function postLikeNotification(id: string){
    const row = await dbClient.select({content: postsTable.content, parentId: postsTable.id}).from(postsTable).where(eq(postsTable.id, id))
    row[0].content.length > 30 ? row[0].content = row[0].content.slice(0, 29) + "..." : ""
    return row[0];
}

async function commentLikeNotification(id: string){
    const row = await dbClient.select({content: commentsTable.comment, parentId: commentsTable.post}).from(commentsTable).where(eq(commentsTable.id, id))
    row[0].content.length > 30 ? row[0].content = row[0].content.slice(0, 29) + "..." : ""
    return row[0];
}

async function CommentNotification(id: string){
    const row = await dbClient.select({content: commentsTable.comment, parentId: commentsTable.post}).from(commentsTable).where(eq(commentsTable.id, id))
    row[0].content.length > 30 ? row[0].content = row[0].content.slice(0, 29) + "..." : ""
    return row[0]
}
